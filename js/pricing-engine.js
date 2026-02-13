/**
 * Nashville Home Pricing Engine
 * CMA-based pricing algorithm with comp scoring and adjustment model.
 */
(function(global) {
    'use strict';

    // ==================== CONFIGURATION ====================

    // Hard filters for comp selection
    var COMP_FILTERS = {
        maxDistanceMiles: 1.0,
        maxAgeDays: 180,
        sqftTolerancePct: 0.20,
        yearBuiltToleranceYears: 15,
        minComps: 3,
        maxComps: 20
    };

    // Widening steps when fewer than minComps are found
    var WIDENING_STEPS = [
        { maxDistanceMiles: 1.5 },
        { sqftTolerancePct: 0.25 },
        { maxAgeDays: 270 },
        { maxDistanceMiles: 3.0, sqftTolerancePct: 0.30 }
    ];

    // Comp scoring weights (sum to 1.0)
    var SCORING_WEIGHTS = {
        proximity: 0.25,
        recency: 0.20,
        sqftSimilarity: 0.20,
        adjustmentMagnitude: 0.15,
        featureMatch: 0.10,
        sameSubdivision: 0.10
    };

    // Nashville-calibrated adjustment factors
    var ADJUSTMENTS = {
        // Time appreciation: Nashville ~2.5% annual = 0.21% per month
        timeAppreciationMonthly: 0.0021,

        // Square footage: 60% of market $/sqft as adjustment rate
        sqftMarketRatio: 0.60,

        // Bedrooms: only adjust when below 3
        bedroomThreshold: 3,
        bedroomValueBelow: 10000,

        // Bathrooms
        fullBathValue: 15000,
        halfBathValue: 6500,

        // Age per year
        agePerYear: 1500,

        // Condition scale (relative to Average = 0)
        conditionScale: {
            'Excellent': 40000,
            'Good': 15000,
            'Average': 0,
            'Fair': -20000,
            'Poor': -45000
        },

        // Garage per space
        garagePerSpace: 20000,

        // Pool
        poolValue: 22000,

        // Lot size per sqft (only for differences > 1000 sqft)
        lotPerSqft: 2,
        lotMinDifference: 1000,

        // Basement scale
        basementScale: {
            'Full Finished': 35000,
            'Partial Finished': 18000,
            'Unfinished': 5000,
            'None': 0
        }
    };

    // Nashville market indicators (defaults, can be overridden)
    var MARKET_INDICATORS = {
        avgDOM: 66,
        listToSaleRatio: 0.9781,
        absorptionRateMonths: 4,
        annualAppreciation: 0.025,
        medianPrice: 485000
    };

    // ==================== UTILITY FUNCTIONS ====================

    /**
     * Haversine distance between two lat/lng points in miles
     */
    function haversineDistance(lat1, lng1, lat2, lng2) {
        var R = 3959; // Earth radius in miles
        var dLat = toRad(lat2 - lat1);
        var dLng = toRad(lng2 - lng1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function toRad(deg) {
        return deg * Math.PI / 180;
    }

    /**
     * Days between two dates
     */
    function daysBetween(dateStr, now) {
        var d = new Date(dateStr);
        var diff = now.getTime() - d.getTime();
        return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    }

    /**
     * Calculate median price per sqft from a set of properties
     */
    function calculateMarketPricePerSqft(properties) {
        var prices = properties
            .filter(function(p) { return p.soldPrice && p.sqft; })
            .map(function(p) { return p.soldPrice / p.sqft; });
        if (prices.length === 0) return 250; // Nashville default
        prices.sort(function(a, b) { return a - b; });
        var mid = Math.floor(prices.length / 2);
        return prices.length % 2 !== 0 ? prices[mid] : (prices[mid - 1] + prices[mid]) / 2;
    }

    /**
     * Format dollar amount
     */
    function formatMoney(n) {
        return '$' + Math.round(n).toLocaleString('en-US');
    }

    /**
     * Format signed dollar amount with +/-
     */
    function formatAdjustment(n) {
        var rounded = Math.round(n);
        if (rounded === 0) return '$0';
        var sign = rounded > 0 ? '+' : '';
        return sign + '$' + Math.abs(rounded).toLocaleString('en-US');
    }

    // ==================== HARD FILTERS ====================

    /**
     * Check if a property passes the hard filters for comp selection
     */
    function passesHardFilters(subject, comp, type, overrides) {
        var filters = Object.assign({}, COMP_FILTERS, overrides || {});
        var now = new Date();

        // Must match property type
        if (subject.propertyType && comp.propertyType &&
            subject.propertyType !== comp.propertyType) {
            return false;
        }

        // Status filter
        if (type === 'closed' && comp.mlsStatus !== 'Closed') return false;
        if (type === 'active' && comp.mlsStatus !== 'Active') return false;

        // Distance check (if coordinates available)
        if (subject.latitude && subject.longitude && comp.latitude && comp.longitude) {
            var dist = haversineDistance(
                subject.latitude, subject.longitude,
                comp.latitude, comp.longitude
            );
            if (dist > filters.maxDistanceMiles) return false;
        }

        // Time check (closed comps only)
        if (type === 'closed' && comp.soldDate) {
            var daysAgo = daysBetween(comp.soldDate, now);
            if (daysAgo > filters.maxAgeDays) return false;
        }

        // Square footage tolerance
        if (subject.sqft && comp.sqft) {
            var pctDiff = Math.abs(subject.sqft - comp.sqft) / subject.sqft;
            if (pctDiff > filters.sqftTolerancePct) return false;
        }

        // Year built tolerance
        if (subject.yearBuilt && comp.yearBuilt) {
            var yearDiff = Math.abs(subject.yearBuilt - comp.yearBuilt);
            if (yearDiff > filters.yearBuiltToleranceYears) return false;
        }

        return true;
    }

    // ==================== ADJUSTMENT CALCULATIONS ====================

    /**
     * Calculate the adjusted sale price for a comp relative to the subject.
     * Returns the adjusted price and a breakdown of all adjustments.
     */
    function calculateAdjustedPrice(subject, comp, marketPricePerSqft) {
        var price = comp.soldPrice || comp.listPrice;
        var adjustedPrice = price;
        var adjustments = {};

        // 1. Time adjustment (for closed comps)
        if (comp.soldDate) {
            var monthsAgo = daysBetween(comp.soldDate, new Date()) / 30;
            var timeAdj = price * ADJUSTMENTS.timeAppreciationMonthly * monthsAgo;
            adjustedPrice += timeAdj;
            adjustments.time = timeAdj;
        } else {
            adjustments.time = 0;
        }

        // 2. Square footage
        if (subject.sqft && comp.sqft) {
            var sqftRate = marketPricePerSqft * ADJUSTMENTS.sqftMarketRatio;
            var sqftAdj = (subject.sqft - comp.sqft) * sqftRate;
            adjustedPrice += sqftAdj;
            adjustments.sqft = sqftAdj;
        } else {
            adjustments.sqft = 0;
        }

        // 3. Bedrooms (only adjust below threshold)
        var subBeds = subject.bedrooms || 0;
        var compBeds = comp.bedrooms || 0;
        if (subBeds < ADJUSTMENTS.bedroomThreshold || compBeds < ADJUSTMENTS.bedroomThreshold) {
            var bedAdj = (subBeds - compBeds) * ADJUSTMENTS.bedroomValueBelow;
            adjustedPrice += bedAdj;
            adjustments.bedrooms = bedAdj;
        } else {
            adjustments.bedrooms = 0;
        }

        // 4. Bathrooms
        var fullBathDiff = (subject.fullBaths || 0) - (comp.fullBaths || 0);
        var halfBathDiff = (subject.halfBaths || 0) - (comp.halfBaths || 0);
        var bathAdj = (fullBathDiff * ADJUSTMENTS.fullBathValue) +
                      (halfBathDiff * ADJUSTMENTS.halfBathValue);
        adjustedPrice += bathAdj;
        adjustments.bathrooms = bathAdj;

        // 5. Age / Year built
        if (subject.yearBuilt && comp.yearBuilt) {
            var yearDiff = subject.yearBuilt - comp.yearBuilt; // positive = subject newer
            var ageAdj = yearDiff * ADJUSTMENTS.agePerYear;
            adjustedPrice += ageAdj;
            adjustments.age = ageAdj;
        } else {
            adjustments.age = 0;
        }

        // 6. Condition
        var subCondVal = ADJUSTMENTS.conditionScale[subject.condition] || 0;
        var compCondVal = ADJUSTMENTS.conditionScale[comp.condition] || 0;
        var condAdj = subCondVal - compCondVal;
        adjustedPrice += condAdj;
        adjustments.condition = condAdj;

        // 7. Garage
        var garageDiff = (subject.garageSpaces || 0) - (comp.garageSpaces || 0);
        var garageAdj = garageDiff * ADJUSTMENTS.garagePerSpace;
        adjustedPrice += garageAdj;
        adjustments.garage = garageAdj;

        // 8. Pool
        var subPool = subject.hasPool ? 1 : 0;
        var compPool = comp.hasPool ? 1 : 0;
        var poolAdj = (subPool - compPool) * ADJUSTMENTS.poolValue;
        adjustedPrice += poolAdj;
        adjustments.pool = poolAdj;

        // 9. Lot size
        if (subject.lotSizeSqft && comp.lotSizeSqft) {
            var lotDiff = subject.lotSizeSqft - comp.lotSizeSqft;
            if (Math.abs(lotDiff) >= ADJUSTMENTS.lotMinDifference) {
                var lotAdj = lotDiff * ADJUSTMENTS.lotPerSqft;
                adjustedPrice += lotAdj;
                adjustments.lot = lotAdj;
            } else {
                adjustments.lot = 0;
            }
        } else {
            adjustments.lot = 0;
        }

        // 10. Basement
        var subBasement = ADJUSTMENTS.basementScale[subject.basement] || 0;
        var compBasement = ADJUSTMENTS.basementScale[comp.basement] || 0;
        var basementAdj = subBasement - compBasement;
        adjustedPrice += basementAdj;
        adjustments.basement = basementAdj;

        // Calculate totals
        var totalAdjustment = adjustedPrice - price;
        var adjustmentPct = price > 0 ? Math.abs(totalAdjustment / price) * 100 : 0;

        return {
            adjustedPrice: Math.round(adjustedPrice),
            totalAdjustment: Math.round(totalAdjustment),
            adjustmentPct: parseFloat(adjustmentPct.toFixed(1)),
            adjustments: adjustments,
            isReliable: adjustmentPct < 15
        };
    }

    // ==================== COMP SCORING ====================

    function scoreProximity(distanceMiles) {
        if (distanceMiles <= 0.1) return 100;
        if (distanceMiles >= 3.0) return 0;
        return Math.max(0, 100 - (distanceMiles * 35));
    }

    function scoreRecency(daysSinceSale) {
        if (daysSinceSale <= 0) return 100;
        if (daysSinceSale >= 365) return 0;
        return Math.max(0, 100 - (daysSinceSale * 0.274));
    }

    function scoreSqftSimilarity(subjectSqft, compSqft) {
        if (!subjectSqft || !compSqft) return 50;
        var pctDiff = Math.abs(subjectSqft - compSqft) / subjectSqft;
        if (pctDiff >= 0.30) return 0;
        return Math.max(0, 100 - (pctDiff * 333));
    }

    function scoreAdjustmentMagnitude(adjustmentPct) {
        if (adjustmentPct >= 25) return 0;
        return Math.max(0, 100 - (adjustmentPct * 4));
    }

    function scoreFeatureMatch(subject, comp) {
        var score = 0;
        // Bedrooms
        if ((subject.bedrooms || 0) === (comp.bedrooms || 0)) score += 30;
        else if (Math.abs((subject.bedrooms || 0) - (comp.bedrooms || 0)) === 1) score += 15;
        // Full baths
        if ((subject.fullBaths || 0) === (comp.fullBaths || 0)) score += 25;
        else if (Math.abs((subject.fullBaths || 0) - (comp.fullBaths || 0)) === 1) score += 12;
        // Garage
        if ((subject.garageSpaces || 0) === (comp.garageSpaces || 0)) score += 20;
        // Pool
        if ((subject.hasPool || false) === (comp.hasPool || false)) score += 15;
        // Stories
        if ((subject.stories || 0) === (comp.stories || 0)) score += 10;
        return score;
    }

    function scoreSameSubdivision(subjectNeighborhood, compNeighborhood) {
        if (!subjectNeighborhood || !compNeighborhood) return 50;
        if (subjectNeighborhood.toLowerCase() === compNeighborhood.toLowerCase()) return 100;
        return 0;
    }

    /**
     * Calculate composite similarity score for a comp
     */
    function calculateCompScore(subject, comp, adjustmentResult) {
        var distance = 0;
        if (subject.latitude && subject.longitude && comp.latitude && comp.longitude) {
            distance = haversineDistance(
                subject.latitude, subject.longitude,
                comp.latitude, comp.longitude
            );
        }

        var dateField = comp.soldDate || comp.listDate;
        var daysSince = dateField ? daysBetween(dateField, new Date()) : 180;

        var scores = {
            proximity: scoreProximity(distance),
            recency: scoreRecency(daysSince),
            sqftSimilarity: scoreSqftSimilarity(subject.sqft, comp.sqft),
            adjustmentMagnitude: scoreAdjustmentMagnitude(adjustmentResult.adjustmentPct),
            featureMatch: scoreFeatureMatch(subject, comp),
            sameSubdivision: scoreSameSubdivision(subject.neighborhood, comp.neighborhood)
        };

        var composite = 0;
        var keys = Object.keys(SCORING_WEIGHTS);
        for (var i = 0; i < keys.length; i++) {
            composite += scores[keys[i]] * SCORING_WEIGHTS[keys[i]];
        }

        return {
            totalScore: Math.round(composite * 10) / 10,
            breakdown: scores,
            distance: Math.round(distance * 100) / 100,
            daysSinceSale: daysSince
        };
    }

    // ==================== MAIN PIPELINE ====================

    /**
     * Find the best comps for a subject property.
     * @param {Object} subject - The subject property
     * @param {Array} allProperties - All available properties
     * @param {string} type - 'closed' or 'active'
     * @returns {Array} Top 5 comps sorted by similarity score
     */
    function findBestComps(subject, allProperties, type) {
        type = type || 'closed';
        var candidates = [];
        var widenLevel = -1;

        // Progressive widening until we have enough comps
        while (candidates.length < COMP_FILTERS.minComps && widenLevel < WIDENING_STEPS.length) {
            var overrides = widenLevel >= 0 ? WIDENING_STEPS[widenLevel] : {};
            candidates = allProperties.filter(function(p) {
                return passesHardFilters(subject, p, type, overrides);
            });
            widenLevel++;
        }

        // Cap at maxComps before scoring
        if (candidates.length > COMP_FILTERS.maxComps) {
            candidates = candidates.slice(0, COMP_FILTERS.maxComps);
        }

        // Calculate market price per sqft from candidate pool
        var marketPsf = calculateMarketPricePerSqft(candidates);

        // Score and rank each candidate
        var scored = candidates.map(function(comp) {
            var adjustment = calculateAdjustedPrice(subject, comp, marketPsf);
            var scoring = calculateCompScore(subject, comp, adjustment);

            return {
                // Original comp data
                listingId: comp.listingId,
                address: comp.address,
                city: comp.city,
                zip: comp.zip,
                neighborhood: comp.neighborhood,
                subdivision: comp.subdivision,
                propertyType: comp.propertyType,
                sqft: comp.sqft,
                lotSizeSqft: comp.lotSizeSqft,
                bedrooms: comp.bedrooms,
                fullBaths: comp.fullBaths,
                halfBaths: comp.halfBaths,
                yearBuilt: comp.yearBuilt,
                stories: comp.stories,
                garageSpaces: comp.garageSpaces,
                hasPool: comp.hasPool,
                basement: comp.basement,
                condition: comp.condition,
                listPrice: comp.listPrice,
                soldPrice: comp.soldPrice,
                pricePerSqft: comp.soldPrice ? Math.round(comp.soldPrice / comp.sqft) : Math.round(comp.listPrice / comp.sqft),
                listDate: comp.listDate,
                soldDate: comp.soldDate,
                daysOnMarket: comp.daysOnMarket,
                latitude: comp.latitude,
                longitude: comp.longitude,
                mlsStatus: comp.mlsStatus,

                // Calculated fields
                adjustedPrice: adjustment.adjustedPrice,
                totalAdjustment: adjustment.totalAdjustment,
                adjustmentPct: adjustment.adjustmentPct,
                adjustments: adjustment.adjustments,
                isReliable: adjustment.isReliable,
                similarityScore: scoring.totalScore,
                scoreBreakdown: scoring.breakdown,
                distance: scoring.distance,
                daysSinceSale: scoring.daysSinceSale
            };
        });

        // Sort by similarity score descending
        scored.sort(function(a, b) { return b.similarityScore - a.similarityScore; });

        // Return top 5
        return scored.slice(0, 5);
    }

    /**
     * Estimate the subject property's price based on the top comps.
     * @param {Object} subject - The subject property
     * @param {Array} rankedComps - Scored and ranked comps (from findBestComps)
     * @returns {Object} Price estimate with range, confidence, and methodology details
     */
    function estimatePrice(subject, rankedComps) {
        if (!rankedComps || rankedComps.length === 0) {
            return {
                suggestedPrice: 0,
                range: { low: 0, suggested: 0, high: 0 },
                confidence: 'Low',
                methodology: {},
                compsUsed: 0,
                marketIndicators: MARKET_INDICATORS
            };
        }

        var comps = rankedComps;

        // Method 1: Weighted average by similarity score (primary)
        var totalWeight = 0;
        var weightedSum = 0;
        for (var i = 0; i < comps.length; i++) {
            totalWeight += comps[i].similarityScore;
            weightedSum += comps[i].adjustedPrice * comps[i].similarityScore;
        }
        var weightedAvg = totalWeight > 0 ? weightedSum / totalWeight : 0;

        // Method 2: Median of adjusted prices
        var sortedPrices = comps.map(function(c) { return c.adjustedPrice; })
                               .sort(function(a, b) { return a - b; });
        var mid = Math.floor(sortedPrices.length / 2);
        var median = sortedPrices.length % 2 !== 0
            ? sortedPrices[mid]
            : (sortedPrices[mid - 1] + sortedPrices[mid]) / 2;

        // Method 3: Price per sqft cross-check
        var totalPsf = 0;
        for (var j = 0; j < comps.length; j++) {
            totalPsf += comps[j].adjustedPrice / (subject.sqft || comps[j].sqft || 1);
        }
        var avgPsf = totalPsf / comps.length;
        var sqftEstimate = avgPsf * (subject.sqft || 0);

        // Suggested price (rounded to nearest $1K)
        var suggestedPrice = Math.round(weightedAvg / 1000) * 1000;

        // Range
        var minAdj = Math.min.apply(null, comps.map(function(c) { return c.adjustedPrice; }));
        var maxAdj = Math.max.apply(null, comps.map(function(c) { return c.adjustedPrice; }));
        var range = {
            low: Math.round(minAdj / 1000) * 1000,
            suggested: suggestedPrice,
            high: Math.round(maxAdj / 1000) * 1000
        };

        // Confidence level
        var avgAdjPct = 0;
        for (var k = 0; k < comps.length; k++) {
            avgAdjPct += comps[k].adjustmentPct;
        }
        avgAdjPct = avgAdjPct / comps.length;

        var spreadPct = suggestedPrice > 0
            ? ((maxAdj - minAdj) / suggestedPrice) * 100
            : 100;

        var confidence = 'High';
        if (avgAdjPct > 10 || spreadPct > 15) confidence = 'Medium';
        if (avgAdjPct > 20 || spreadPct > 25 || comps.length < 3) confidence = 'Low';

        return {
            suggestedPrice: suggestedPrice,
            range: range,
            confidence: confidence,
            methodology: {
                weightedAverage: Math.round(weightedAvg),
                median: Math.round(median),
                pricePerSqft: Math.round(avgPsf),
                sqftEstimate: Math.round(sqftEstimate),
                avgAdjustmentPct: parseFloat(avgAdjPct.toFixed(1)),
                priceSpreadPct: parseFloat(spreadPct.toFixed(1))
            },
            compsUsed: comps.length,
            marketIndicators: MARKET_INDICATORS
        };
    }

    // ==================== PUBLIC API ====================

    global.PricingEngine = {
        findBestComps: findBestComps,
        estimatePrice: estimatePrice,
        calculateAdjustedPrice: calculateAdjustedPrice,
        calculateCompScore: calculateCompScore,
        haversineDistance: haversineDistance,
        formatMoney: formatMoney,
        formatAdjustment: formatAdjustment,
        COMP_FILTERS: COMP_FILTERS,
        SCORING_WEIGHTS: SCORING_WEIGHTS,
        ADJUSTMENTS: ADJUSTMENTS,
        MARKET_INDICATORS: MARKET_INDICATORS
    };

})(window);
