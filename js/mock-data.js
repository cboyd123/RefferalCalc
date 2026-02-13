/**
 * Mock Nashville MLS Data
 * Realistic property records across Nashville neighborhoods.
 * Schema mirrors RESO Web API fields for seamless future API swap.
 */
(function(global) {
    'use strict';

    var MOCK_PROPERTIES = [
        // ==================== EAST NASHVILLE ====================
        {
            listingId: 'MOCK-001', mlsStatus: 'Closed',
            address: '1234 Shelby Ave', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1850, lotSizeSqft: 6500, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 1945, stories: 1.5, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 525000, soldPrice: 515000,
            listDate: '2025-09-15', soldDate: '2025-11-02', daysOnMarket: 48,
            latitude: 36.1783, longitude: -86.7440
        },
        {
            listingId: 'MOCK-002', mlsStatus: 'Closed',
            address: '567 Fatherland St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1720, lotSizeSqft: 5800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1940, stories: 1, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 498000, soldPrice: 488000,
            listDate: '2025-10-01', soldDate: '2025-12-10', daysOnMarket: 70,
            latitude: 36.1772, longitude: -86.7480
        },
        {
            listingId: 'MOCK-003', mlsStatus: 'Closed',
            address: '890 Woodland St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Five Points',
            propertyType: 'Single Family',
            sqft: 2100, lotSizeSqft: 7200, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2018, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 635000, soldPrice: 625000,
            listDate: '2025-08-20', soldDate: '2025-10-05', daysOnMarket: 46,
            latitude: 36.1755, longitude: -86.7515
        },
        {
            listingId: 'MOCK-004', mlsStatus: 'Active',
            address: '321 Chapel Ave', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1950, lotSizeSqft: 6800, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 1952, stories: 1.5, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 539000, soldPrice: null,
            listDate: '2026-01-15', soldDate: null, daysOnMarket: 29,
            latitude: 36.1790, longitude: -86.7455
        },
        {
            listingId: 'MOCK-005', mlsStatus: 'Closed',
            address: '1102 Boscobel St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1680, lotSizeSqft: 5500, bedrooms: 3, fullBaths: 1, halfBaths: 1,
            yearBuilt: 1935, stories: 1, garageSpaces: 0, hasPool: false,
            basement: 'Unfinished', condition: 'Average',
            listPrice: 449000, soldPrice: 435000,
            listDate: '2025-11-01', soldDate: '2026-01-20', daysOnMarket: 80,
            latitude: 36.1798, longitude: -86.7425
        },
        {
            listingId: 'MOCK-006', mlsStatus: 'Active',
            address: '455 S 11th St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Five Points',
            propertyType: 'Single Family',
            sqft: 2200, lotSizeSqft: 7000, bedrooms: 4, fullBaths: 3, halfBaths: 0,
            yearBuilt: 2020, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 665000, soldPrice: null,
            listDate: '2026-01-28', soldDate: null, daysOnMarket: 16,
            latitude: 36.1760, longitude: -86.7495
        },
        {
            listingId: 'MOCK-007', mlsStatus: 'Closed',
            address: '708 Lillian St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Inglewood',
            propertyType: 'Single Family',
            sqft: 1540, lotSizeSqft: 8200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1955, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Average',
            listPrice: 415000, soldPrice: 405000,
            listDate: '2025-09-10', soldDate: '2025-11-15', daysOnMarket: 66,
            latitude: 36.1912, longitude: -86.7350
        },
        {
            listingId: 'MOCK-008', mlsStatus: 'Closed',
            address: '1320 Meridian St', city: 'Nashville', zip: '37207',
            neighborhood: 'East Nashville', subdivision: 'Inglewood',
            propertyType: 'Single Family',
            sqft: 1900, lotSizeSqft: 9100, bedrooms: 4, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1948, stories: 1.5, garageSpaces: 1, hasPool: false,
            basement: 'Partial Finished', condition: 'Good',
            listPrice: 475000, soldPrice: 468000,
            listDate: '2025-10-20', soldDate: '2025-12-28', daysOnMarket: 69,
            latitude: 36.1935, longitude: -86.7310
        },
        {
            listingId: 'MOCK-009', mlsStatus: 'Active',
            address: '915 Strauss Ave', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1780, lotSizeSqft: 6200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1942, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 510000, soldPrice: null,
            listDate: '2026-02-01', soldDate: null, daysOnMarket: 12,
            latitude: 36.1775, longitude: -86.7460
        },
        {
            listingId: 'MOCK-010', mlsStatus: 'Closed',
            address: '204 Greenwood Ave', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 2050, lotSizeSqft: 6900, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2016, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 589000, soldPrice: 579000,
            listDate: '2025-08-05', soldDate: '2025-09-22', daysOnMarket: 48,
            latitude: 36.1768, longitude: -86.7435
        },

        // ==================== THE NATIONS / WEST NASHVILLE ====================
        {
            listingId: 'MOCK-011', mlsStatus: 'Closed',
            address: '4812 Michigan Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Single Family',
            sqft: 1650, lotSizeSqft: 5200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2019, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 545000, soldPrice: 540000,
            listDate: '2025-09-05', soldDate: '2025-10-18', daysOnMarket: 43,
            latitude: 36.1650, longitude: -86.8455
        },
        {
            listingId: 'MOCK-012', mlsStatus: 'Closed',
            address: '5108 Tennessee Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Single Family',
            sqft: 1800, lotSizeSqft: 5400, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2021, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 599000, soldPrice: 590000,
            listDate: '2025-10-12', soldDate: '2025-11-28', daysOnMarket: 47,
            latitude: 36.1662, longitude: -86.8480
        },
        {
            listingId: 'MOCK-013', mlsStatus: 'Active',
            address: '4605 Nebraska Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Single Family',
            sqft: 1550, lotSizeSqft: 4800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2020, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 515000, soldPrice: null,
            listDate: '2026-01-20', soldDate: null, daysOnMarket: 24,
            latitude: 36.1645, longitude: -86.8440
        },
        {
            listingId: 'MOCK-014', mlsStatus: 'Closed',
            address: '5215 Georgia Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Single Family',
            sqft: 1420, lotSizeSqft: 4500, bedrooms: 2, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2017, stories: 2, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 455000, soldPrice: 448000,
            listDate: '2025-11-08', soldDate: '2026-01-12', daysOnMarket: 65,
            latitude: 36.1670, longitude: -86.8502
        },
        {
            listingId: 'MOCK-015', mlsStatus: 'Closed',
            address: '4920 Dakota Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Single Family',
            sqft: 2000, lotSizeSqft: 5600, bedrooms: 4, fullBaths: 3, halfBaths: 0,
            yearBuilt: 2022, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 650000, soldPrice: 642000,
            listDate: '2025-08-15', soldDate: '2025-10-01', daysOnMarket: 47,
            latitude: 36.1658, longitude: -86.8465
        },

        // ==================== GERMANTOWN / SALEMTOWN ====================
        {
            listingId: 'MOCK-016', mlsStatus: 'Closed',
            address: '1408 5th Ave N', city: 'Nashville', zip: '37208',
            neighborhood: 'Germantown', subdivision: 'Germantown',
            propertyType: 'Single Family',
            sqft: 2400, lotSizeSqft: 4200, bedrooms: 4, fullBaths: 3, halfBaths: 1,
            yearBuilt: 2019, stories: 3, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 785000, soldPrice: 775000,
            listDate: '2025-09-20', soldDate: '2025-11-05', daysOnMarket: 46,
            latitude: 36.1812, longitude: -86.7880
        },
        {
            listingId: 'MOCK-017', mlsStatus: 'Active',
            address: '820 Monroe St', city: 'Nashville', zip: '37208',
            neighborhood: 'Germantown', subdivision: 'Germantown',
            propertyType: 'Townhouse',
            sqft: 1900, lotSizeSqft: 2100, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2021, stories: 3, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 625000, soldPrice: null,
            listDate: '2026-01-10', soldDate: null, daysOnMarket: 34,
            latitude: 36.1825, longitude: -86.7895
        },
        {
            listingId: 'MOCK-018', mlsStatus: 'Closed',
            address: '1612 6th Ave N', city: 'Nashville', zip: '37208',
            neighborhood: 'Germantown', subdivision: 'Salemtown',
            propertyType: 'Single Family',
            sqft: 2100, lotSizeSqft: 3800, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2020, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 695000, soldPrice: 680000,
            listDate: '2025-10-05', soldDate: '2025-12-15', daysOnMarket: 71,
            latitude: 36.1835, longitude: -86.7870
        },
        {
            listingId: 'MOCK-019', mlsStatus: 'Closed',
            address: '910 Taylor St', city: 'Nashville', zip: '37208',
            neighborhood: 'Germantown', subdivision: 'Germantown',
            propertyType: 'Single Family',
            sqft: 2250, lotSizeSqft: 4000, bedrooms: 4, fullBaths: 3, halfBaths: 0,
            yearBuilt: 2018, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 749000, soldPrice: 738000,
            listDate: '2025-08-28', soldDate: '2025-10-15', daysOnMarket: 48,
            latitude: 36.1820, longitude: -86.7905
        },

        // ==================== SYLVAN PARK / CHARLOTTE PARK ====================
        {
            listingId: 'MOCK-020', mlsStatus: 'Closed',
            address: '4410 Idaho Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'Sylvan Park', subdivision: 'Sylvan Park',
            propertyType: 'Single Family',
            sqft: 1750, lotSizeSqft: 6800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1940, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Partial Finished', condition: 'Good',
            listPrice: 560000, soldPrice: 552000,
            listDate: '2025-09-25', soldDate: '2025-11-10', daysOnMarket: 46,
            latitude: 36.1560, longitude: -86.8340
        },
        {
            listingId: 'MOCK-021', mlsStatus: 'Closed',
            address: '4308 Elkins Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'Sylvan Park', subdivision: 'Sylvan Park',
            propertyType: 'Single Family',
            sqft: 2100, lotSizeSqft: 7200, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2015, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 625000, soldPrice: 615000,
            listDate: '2025-10-15', soldDate: '2025-12-02', daysOnMarket: 48,
            latitude: 36.1548, longitude: -86.8325
        },
        {
            listingId: 'MOCK-022', mlsStatus: 'Active',
            address: '4515 Park Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'Sylvan Park', subdivision: 'Sylvan Park',
            propertyType: 'Single Family',
            sqft: 1600, lotSizeSqft: 6000, bedrooms: 3, fullBaths: 1, halfBaths: 1,
            yearBuilt: 1938, stories: 1, garageSpaces: 0, hasPool: false,
            basement: 'Unfinished', condition: 'Average',
            listPrice: 485000, soldPrice: null,
            listDate: '2026-01-22', soldDate: null, daysOnMarket: 22,
            latitude: 36.1555, longitude: -86.8355
        },
        {
            listingId: 'MOCK-023', mlsStatus: 'Closed',
            address: '508 53rd Ave N', city: 'Nashville', zip: '37209',
            neighborhood: 'Charlotte Park', subdivision: 'Charlotte Park',
            propertyType: 'Single Family',
            sqft: 1380, lotSizeSqft: 7500, bedrooms: 3, fullBaths: 1, halfBaths: 0,
            yearBuilt: 1952, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Average',
            listPrice: 395000, soldPrice: 382000,
            listDate: '2025-10-28', soldDate: '2026-01-05', daysOnMarket: 69,
            latitude: 36.1620, longitude: -86.8510
        },

        // ==================== WEDGEWOOD-HOUSTON / 12 SOUTH ====================
        {
            listingId: 'MOCK-024', mlsStatus: 'Closed',
            address: '1215 Pillow St', city: 'Nashville', zip: '37203',
            neighborhood: 'Wedgewood-Houston', subdivision: 'WeHo',
            propertyType: 'Single Family',
            sqft: 1800, lotSizeSqft: 4500, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2020, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 615000, soldPrice: 605000,
            listDate: '2025-09-08', soldDate: '2025-10-22', daysOnMarket: 44,
            latitude: 36.1420, longitude: -86.7780
        },
        {
            listingId: 'MOCK-025', mlsStatus: 'Closed',
            address: '905 Archer St', city: 'Nashville', zip: '37203',
            neighborhood: 'Wedgewood-Houston', subdivision: 'WeHo',
            propertyType: 'Single Family',
            sqft: 1550, lotSizeSqft: 3800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2018, stories: 2, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 530000, soldPrice: 522000,
            listDate: '2025-11-12', soldDate: '2026-01-08', daysOnMarket: 57,
            latitude: 36.1432, longitude: -86.7765
        },
        {
            listingId: 'MOCK-026', mlsStatus: 'Active',
            address: '1308 Linden Ave', city: 'Nashville', zip: '37212',
            neighborhood: '12 South', subdivision: '12 South',
            propertyType: 'Single Family',
            sqft: 2300, lotSizeSqft: 7800, bedrooms: 4, fullBaths: 3, halfBaths: 1,
            yearBuilt: 2017, stories: 2, garageSpaces: 2, hasPool: true,
            basement: 'None', condition: 'Excellent',
            listPrice: 895000, soldPrice: null,
            listDate: '2026-02-05', soldDate: null, daysOnMarket: 8,
            latitude: 36.1290, longitude: -86.7850
        },
        {
            listingId: 'MOCK-027', mlsStatus: 'Closed',
            address: '2812 Belwood St', city: 'Nashville', zip: '37212',
            neighborhood: '12 South', subdivision: '12 South',
            propertyType: 'Single Family',
            sqft: 2000, lotSizeSqft: 6500, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 1948, stories: 1.5, garageSpaces: 1, hasPool: false,
            basement: 'Full Finished', condition: 'Good',
            listPrice: 725000, soldPrice: 710000,
            listDate: '2025-08-18', soldDate: '2025-10-12', daysOnMarket: 55,
            latitude: 36.1305, longitude: -86.7870
        },
        {
            listingId: 'MOCK-028', mlsStatus: 'Closed',
            address: '1012 Clayton Ave', city: 'Nashville', zip: '37204',
            neighborhood: '12 South', subdivision: '12 South',
            propertyType: 'Single Family',
            sqft: 1750, lotSizeSqft: 5800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1942, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Partial Finished', condition: 'Good',
            listPrice: 655000, soldPrice: 645000,
            listDate: '2025-10-01', soldDate: '2025-11-20', daysOnMarket: 50,
            latitude: 36.1280, longitude: -86.7835
        },

        // ==================== ANTIOCH / SOUTHEAST ====================
        {
            listingId: 'MOCK-029', mlsStatus: 'Closed',
            address: '3205 Earhart Rd', city: 'Antioch', zip: '37013',
            neighborhood: 'Antioch', subdivision: 'Priest Lake Park',
            propertyType: 'Single Family',
            sqft: 1650, lotSizeSqft: 8500, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1998, stories: 1, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Average',
            listPrice: 345000, soldPrice: 338000,
            listDate: '2025-09-18', soldDate: '2025-11-25', daysOnMarket: 68,
            latitude: 36.0610, longitude: -86.6720
        },
        {
            listingId: 'MOCK-030', mlsStatus: 'Closed',
            address: '812 Apache Trail', city: 'Antioch', zip: '37013',
            neighborhood: 'Antioch', subdivision: 'Antioch Estates',
            propertyType: 'Single Family',
            sqft: 1480, lotSizeSqft: 7200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1992, stories: 1, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Average',
            listPrice: 320000, soldPrice: 312000,
            listDate: '2025-10-05', soldDate: '2025-12-18', daysOnMarket: 74,
            latitude: 36.0585, longitude: -86.6695
        },
        {
            listingId: 'MOCK-031', mlsStatus: 'Active',
            address: '1508 Bell Rd Ct', city: 'Antioch', zip: '37013',
            neighborhood: 'Antioch', subdivision: 'Antioch Estates',
            propertyType: 'Single Family',
            sqft: 1750, lotSizeSqft: 9000, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2005, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 375000, soldPrice: null,
            listDate: '2026-01-05', soldDate: null, daysOnMarket: 39,
            latitude: 36.0540, longitude: -86.6560
        },
        {
            listingId: 'MOCK-032', mlsStatus: 'Closed',
            address: '2410 Chandler Pl', city: 'Antioch', zip: '37013',
            neighborhood: 'Antioch', subdivision: 'Burkitt Village',
            propertyType: 'Single Family',
            sqft: 2100, lotSizeSqft: 6000, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2016, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 410000, soldPrice: 402000,
            listDate: '2025-08-25', soldDate: '2025-10-08', daysOnMarket: 44,
            latitude: 36.0380, longitude: -86.6480
        },
        {
            listingId: 'MOCK-033', mlsStatus: 'Closed',
            address: '5012 Cane Ridge Rd', city: 'Antioch', zip: '37013',
            neighborhood: 'Antioch', subdivision: 'Cane Ridge',
            propertyType: 'Single Family',
            sqft: 1900, lotSizeSqft: 7800, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2010, stories: 2, garageSpaces: 2, hasPool: true,
            basement: 'None', condition: 'Good',
            listPrice: 385000, soldPrice: 378000,
            listDate: '2025-11-02', soldDate: '2026-01-15', daysOnMarket: 74,
            latitude: 36.0250, longitude: -86.6350
        },

        // ==================== DONELSON ====================
        {
            listingId: 'MOCK-034', mlsStatus: 'Closed',
            address: '2818 McGinnis Dr', city: 'Nashville', zip: '37214',
            neighborhood: 'Donelson', subdivision: 'Donelson Hills',
            propertyType: 'Single Family',
            sqft: 1620, lotSizeSqft: 10500, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1965, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Full Finished', condition: 'Good',
            listPrice: 420000, soldPrice: 412000,
            listDate: '2025-09-12', soldDate: '2025-11-08', daysOnMarket: 57,
            latitude: 36.1620, longitude: -86.6580
        },
        {
            listingId: 'MOCK-035', mlsStatus: 'Closed',
            address: '505 Clearview Dr', city: 'Nashville', zip: '37214',
            neighborhood: 'Donelson', subdivision: 'Donelson Hills',
            propertyType: 'Single Family',
            sqft: 1850, lotSizeSqft: 12000, bedrooms: 4, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1960, stories: 1.5, garageSpaces: 2, hasPool: true,
            basement: 'Full Finished', condition: 'Good',
            listPrice: 485000, soldPrice: 475000,
            listDate: '2025-10-20', soldDate: '2025-12-15', daysOnMarket: 56,
            latitude: 36.1635, longitude: -86.6550
        },
        {
            listingId: 'MOCK-036', mlsStatus: 'Active',
            address: '3105 Lakeland Dr', city: 'Nashville', zip: '37214',
            neighborhood: 'Donelson', subdivision: 'Lakewood',
            propertyType: 'Single Family',
            sqft: 1500, lotSizeSqft: 9800, bedrooms: 3, fullBaths: 1, halfBaths: 1,
            yearBuilt: 1958, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Unfinished', condition: 'Average',
            listPrice: 365000, soldPrice: null,
            listDate: '2026-02-01', soldDate: null, daysOnMarket: 12,
            latitude: 36.1648, longitude: -86.6520
        },

        // ==================== NORTH NASHVILLE ====================
        {
            listingId: 'MOCK-037', mlsStatus: 'Closed',
            address: '1715 Underwood St', city: 'Nashville', zip: '37208',
            neighborhood: 'North Nashville', subdivision: 'Hope Gardens',
            propertyType: 'Single Family',
            sqft: 1400, lotSizeSqft: 5000, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2019, stories: 2, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 425000, soldPrice: 418000,
            listDate: '2025-10-15', soldDate: '2025-12-01', daysOnMarket: 47,
            latitude: 36.1880, longitude: -86.8020
        },
        {
            listingId: 'MOCK-038', mlsStatus: 'Closed',
            address: '2208 Meharry Blvd', city: 'Nashville', zip: '37208',
            neighborhood: 'North Nashville', subdivision: 'Fisk-Meharry',
            propertyType: 'Single Family',
            sqft: 1250, lotSizeSqft: 4800, bedrooms: 3, fullBaths: 1, halfBaths: 0,
            yearBuilt: 1948, stories: 1, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Fair',
            listPrice: 295000, soldPrice: 280000,
            listDate: '2025-09-28', soldDate: '2025-12-10', daysOnMarket: 73,
            latitude: 36.1895, longitude: -86.8050
        },
        {
            listingId: 'MOCK-039', mlsStatus: 'Active',
            address: '1902 14th Ave N', city: 'Nashville', zip: '37208',
            neighborhood: 'North Nashville', subdivision: 'Hope Gardens',
            propertyType: 'Single Family',
            sqft: 1650, lotSizeSqft: 5500, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2022, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 475000, soldPrice: null,
            listDate: '2026-01-18', soldDate: null, daysOnMarket: 26,
            latitude: 36.1870, longitude: -86.8005
        },
        {
            listingId: 'MOCK-040', mlsStatus: 'Closed',
            address: '1510 Dr DB Todd Jr Blvd', city: 'Nashville', zip: '37208',
            neighborhood: 'North Nashville', subdivision: 'Buena Vista',
            propertyType: 'Single Family',
            sqft: 1580, lotSizeSqft: 4200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2021, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 445000, soldPrice: 438000,
            listDate: '2025-11-05', soldDate: '2026-01-10', daysOnMarket: 66,
            latitude: 36.1852, longitude: -86.7985
        },

        // ==================== BERRY HILL / MELROSE ====================
        {
            listingId: 'MOCK-041', mlsStatus: 'Closed',
            address: '2715 Barclay Dr', city: 'Nashville', zip: '37204',
            neighborhood: 'Berry Hill', subdivision: 'Berry Hill',
            propertyType: 'Single Family',
            sqft: 1450, lotSizeSqft: 6200, bedrooms: 3, fullBaths: 1, halfBaths: 0,
            yearBuilt: 1950, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Unfinished', condition: 'Average',
            listPrice: 465000, soldPrice: 455000,
            listDate: '2025-10-08', soldDate: '2025-12-05', daysOnMarket: 58,
            latitude: 36.1185, longitude: -86.7650
        },
        {
            listingId: 'MOCK-042', mlsStatus: 'Closed',
            address: '3010 Brightwood Ave', city: 'Nashville', zip: '37212',
            neighborhood: 'Melrose', subdivision: 'Melrose Heights',
            propertyType: 'Single Family',
            sqft: 1800, lotSizeSqft: 7000, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1945, stories: 1.5, garageSpaces: 1, hasPool: false,
            basement: 'Partial Finished', condition: 'Good',
            listPrice: 595000, soldPrice: 582000,
            listDate: '2025-08-30', soldDate: '2025-10-25', daysOnMarket: 56,
            latitude: 36.1230, longitude: -86.7720
        },
        {
            listingId: 'MOCK-043', mlsStatus: 'Active',
            address: '2908 Primrose Cir', city: 'Nashville', zip: '37212',
            neighborhood: 'Melrose', subdivision: 'Melrose Heights',
            propertyType: 'Single Family',
            sqft: 2050, lotSizeSqft: 7500, bedrooms: 4, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2016, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 685000, soldPrice: null,
            listDate: '2026-02-02', soldDate: null, daysOnMarket: 11,
            latitude: 36.1240, longitude: -86.7735
        },

        // ==================== MADISON ====================
        {
            listingId: 'MOCK-044', mlsStatus: 'Closed',
            address: '725 Neelys Bend Rd', city: 'Madison', zip: '37115',
            neighborhood: 'Madison', subdivision: 'Neelys Bend',
            propertyType: 'Single Family',
            sqft: 1500, lotSizeSqft: 10200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1968, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Full Finished', condition: 'Average',
            listPrice: 340000, soldPrice: 332000,
            listDate: '2025-09-22', soldDate: '2025-11-30', daysOnMarket: 69,
            latitude: 36.2580, longitude: -86.7080
        },
        {
            listingId: 'MOCK-045', mlsStatus: 'Closed',
            address: '412 Anderson Ln', city: 'Madison', zip: '37115',
            neighborhood: 'Madison', subdivision: 'Madison Park',
            propertyType: 'Single Family',
            sqft: 1320, lotSizeSqft: 8800, bedrooms: 3, fullBaths: 1, halfBaths: 0,
            yearBuilt: 1962, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'Unfinished', condition: 'Fair',
            listPrice: 285000, soldPrice: 272000,
            listDate: '2025-10-18', soldDate: '2026-01-05', daysOnMarket: 79,
            latitude: 36.2545, longitude: -86.7120
        },
        {
            listingId: 'MOCK-046', mlsStatus: 'Active',
            address: '1018 Myatt Dr', city: 'Madison', zip: '37115',
            neighborhood: 'Madison', subdivision: 'Myatt Acres',
            propertyType: 'Single Family',
            sqft: 1680, lotSizeSqft: 11500, bedrooms: 4, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1972, stories: 1, garageSpaces: 2, hasPool: false,
            basement: 'Full Finished', condition: 'Good',
            listPrice: 389000, soldPrice: null,
            listDate: '2026-01-25', soldDate: null, daysOnMarket: 19,
            latitude: 36.2612, longitude: -86.7050
        },

        // ==================== HERMITAGE ====================
        {
            listingId: 'MOCK-047', mlsStatus: 'Closed',
            address: '4405 Rachel Donelson Pass', city: 'Hermitage', zip: '37076',
            neighborhood: 'Hermitage', subdivision: 'Hermitage Hills',
            propertyType: 'Single Family',
            sqft: 1750, lotSizeSqft: 12500, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1985, stories: 1, garageSpaces: 2, hasPool: false,
            basement: 'Full Finished', condition: 'Good',
            listPrice: 395000, soldPrice: 388000,
            listDate: '2025-09-05', soldDate: '2025-11-12', daysOnMarket: 68,
            latitude: 36.1920, longitude: -86.5950
        },
        {
            listingId: 'MOCK-048', mlsStatus: 'Closed',
            address: '5210 Stonewood Dr', city: 'Hermitage', zip: '37076',
            neighborhood: 'Hermitage', subdivision: 'Stones River',
            propertyType: 'Single Family',
            sqft: 2200, lotSizeSqft: 14000, bedrooms: 4, fullBaths: 3, halfBaths: 0,
            yearBuilt: 2002, stories: 2, garageSpaces: 2, hasPool: true,
            basement: 'None', condition: 'Good',
            listPrice: 445000, soldPrice: 435000,
            listDate: '2025-10-10', soldDate: '2025-12-05', daysOnMarket: 56,
            latitude: 36.1890, longitude: -86.5880
        },

        // ==================== CONDOS / TOWNHOUSES ====================
        {
            listingId: 'MOCK-049', mlsStatus: 'Closed',
            address: '1212 Laurel St Unit 408', city: 'Nashville', zip: '37203',
            neighborhood: 'The Gulch', subdivision: 'Icon',
            propertyType: 'Condo',
            sqft: 1100, lotSizeSqft: 0, bedrooms: 2, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2017, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 425000, soldPrice: 415000,
            listDate: '2025-09-28', soldDate: '2025-11-18', daysOnMarket: 51,
            latitude: 36.1520, longitude: -86.7860
        },
        {
            listingId: 'MOCK-050', mlsStatus: 'Active',
            address: '600 12th Ave S Unit 310', city: 'Nashville', zip: '37203',
            neighborhood: 'The Gulch', subdivision: 'Velocity',
            propertyType: 'Condo',
            sqft: 980, lotSizeSqft: 0, bedrooms: 1, fullBaths: 1, halfBaths: 0,
            yearBuilt: 2019, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 375000, soldPrice: null,
            listDate: '2026-01-30', soldDate: null, daysOnMarket: 14,
            latitude: 36.1505, longitude: -86.7870
        },
        {
            listingId: 'MOCK-051', mlsStatus: 'Closed',
            address: '1510 Demonbreun St Unit 602', city: 'Nashville', zip: '37203',
            neighborhood: 'The Gulch', subdivision: 'Encore',
            propertyType: 'Condo',
            sqft: 1350, lotSizeSqft: 0, bedrooms: 2, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2020, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 510000, soldPrice: 498000,
            listDate: '2025-08-22', soldDate: '2025-10-08', daysOnMarket: 47,
            latitude: 36.1510, longitude: -86.7885
        },
        {
            listingId: 'MOCK-052', mlsStatus: 'Closed',
            address: '415 Church St Unit 2205', city: 'Nashville', zip: '37219',
            neighborhood: 'Downtown', subdivision: 'Viridian',
            propertyType: 'Condo',
            sqft: 1500, lotSizeSqft: 0, bedrooms: 2, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2021, stories: 1, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 650000, soldPrice: 635000,
            listDate: '2025-09-15', soldDate: '2025-11-01', daysOnMarket: 47,
            latitude: 36.1625, longitude: -86.7795
        },

        // ==================== ADDITIONAL EAST NASHVILLE (variety) ====================
        {
            listingId: 'MOCK-053', mlsStatus: 'Closed',
            address: '1605 Holly St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Lockeland Springs',
            propertyType: 'Single Family',
            sqft: 1920, lotSizeSqft: 6300, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2015, stories: 2, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 565000, soldPrice: 558000,
            listDate: '2025-10-08', soldDate: '2025-11-22', daysOnMarket: 45,
            latitude: 36.1780, longitude: -86.7420
        },
        {
            listingId: 'MOCK-054', mlsStatus: 'Closed',
            address: '308 S 14th St', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Five Points',
            propertyType: 'Single Family',
            sqft: 1600, lotSizeSqft: 5200, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 2019, stories: 2, garageSpaces: 0, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 495000, soldPrice: 489000,
            listDate: '2025-11-20', soldDate: '2026-01-18', daysOnMarket: 59,
            latitude: 36.1748, longitude: -86.7520
        },
        {
            listingId: 'MOCK-055', mlsStatus: 'Closed',
            address: '711 N 2nd St', city: 'Nashville', zip: '37207',
            neighborhood: 'East Nashville', subdivision: 'Cleveland Park',
            propertyType: 'Single Family',
            sqft: 2200, lotSizeSqft: 5800, bedrooms: 4, fullBaths: 3, halfBaths: 0,
            yearBuilt: 2022, stories: 2, garageSpaces: 2, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 690000, soldPrice: 678000,
            listDate: '2025-08-10', soldDate: '2025-09-28', daysOnMarket: 49,
            latitude: 36.1830, longitude: -86.7540
        },
        {
            listingId: 'MOCK-056', mlsStatus: 'Active',
            address: '1420 Ordway Pl', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Inglewood',
            propertyType: 'Single Family',
            sqft: 1680, lotSizeSqft: 7800, bedrooms: 3, fullBaths: 2, halfBaths: 0,
            yearBuilt: 1950, stories: 1, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Good',
            listPrice: 448000, soldPrice: null,
            listDate: '2026-02-08', soldDate: null, daysOnMarket: 5,
            latitude: 36.1905, longitude: -86.7365
        },
        {
            listingId: 'MOCK-057', mlsStatus: 'Closed',
            address: '924 Riverside Dr', city: 'Nashville', zip: '37206',
            neighborhood: 'East Nashville', subdivision: 'Shelby Village',
            propertyType: 'Single Family',
            sqft: 2350, lotSizeSqft: 8900, bedrooms: 4, fullBaths: 3, halfBaths: 1,
            yearBuilt: 2017, stories: 2, garageSpaces: 2, hasPool: true,
            basement: 'None', condition: 'Excellent',
            listPrice: 780000, soldPrice: 765000,
            listDate: '2025-09-02', soldDate: '2025-10-20', daysOnMarket: 48,
            latitude: 36.1740, longitude: -86.7380
        },

        // ==================== ADDITIONAL VARIETY ====================
        {
            listingId: 'MOCK-058', mlsStatus: 'Closed',
            address: '3612 Wiley Ave', city: 'Nashville', zip: '37209',
            neighborhood: 'Sylvan Park', subdivision: 'Sylvan Park',
            propertyType: 'Single Family',
            sqft: 1520, lotSizeSqft: 5900, bedrooms: 2, fullBaths: 1, halfBaths: 1,
            yearBuilt: 1935, stories: 1, garageSpaces: 0, hasPool: false,
            basement: 'Partial Finished', condition: 'Average',
            listPrice: 460000, soldPrice: 448000,
            listDate: '2025-11-15', soldDate: '2026-01-22', daysOnMarket: 68,
            latitude: 36.1575, longitude: -86.8310
        },
        {
            listingId: 'MOCK-059', mlsStatus: 'Closed',
            address: '108 39th Ave N', city: 'Nashville', zip: '37209',
            neighborhood: 'The Nations', subdivision: 'Nations',
            propertyType: 'Townhouse',
            sqft: 1680, lotSizeSqft: 2200, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2023, stories: 3, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 525000, soldPrice: 518000,
            listDate: '2025-10-22', soldDate: '2025-12-08', daysOnMarket: 47,
            latitude: 36.1655, longitude: -86.8430
        },
        {
            listingId: 'MOCK-060', mlsStatus: 'Active',
            address: '2215 10th Ave S', city: 'Nashville', zip: '37204',
            neighborhood: 'Wedgewood-Houston', subdivision: 'WeHo',
            propertyType: 'Townhouse',
            sqft: 1750, lotSizeSqft: 2000, bedrooms: 3, fullBaths: 2, halfBaths: 1,
            yearBuilt: 2024, stories: 3, garageSpaces: 1, hasPool: false,
            basement: 'None', condition: 'Excellent',
            listPrice: 579000, soldPrice: null,
            listDate: '2026-02-01', soldDate: null, daysOnMarket: 12,
            latitude: 36.1410, longitude: -86.7770
        }
    ];

    global.MOCK_PROPERTIES = MOCK_PROPERTIES;

})(window);
