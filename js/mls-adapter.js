/**
 * MLS Data Adapter
 * Abstracts the data source so the pricing engine works identically
 * with mock data, manual entry, or a live MLS API.
 *
 * Modes:
 *   'mock'   - Uses MOCK_PROPERTIES from mock-data.js (default)
 *   'api'    - Future: calls backend proxy -> MLS Grid RESO Web API
 */
(function(global) {
    'use strict';

    function MLSAdapter(mode) {
        this.mode = mode || 'mock';
    }

    /**
     * Search for comparable properties based on subject property criteria.
     * Returns a Promise resolving to an array of property objects.
     */
    MLSAdapter.prototype.searchComps = function(subject, type) {
        switch (this.mode) {
            case 'mock':
                return this._searchMock(subject, type);
            case 'api':
                return this._searchAPI(subject, type);
            default:
                return this._searchMock(subject, type);
        }
    };

    /**
     * Get all available properties (for browsing / overview)
     */
    MLSAdapter.prototype.getAllProperties = function() {
        switch (this.mode) {
            case 'mock':
                return Promise.resolve(global.MOCK_PROPERTIES || []);
            case 'api':
                return this._fetchAllAPI();
            default:
                return Promise.resolve(global.MOCK_PROPERTIES || []);
        }
    };

    // ==================== MOCK MODE ====================

    MLSAdapter.prototype._searchMock = function(subject, type) {
        var properties = global.MOCK_PROPERTIES || [];

        // Pre-filter by type
        var filtered = properties.filter(function(p) {
            if (type === 'closed') return p.mlsStatus === 'Closed';
            if (type === 'active') return p.mlsStatus === 'Active';
            return true;
        });

        // Pre-filter by neighborhood if subject has one
        // (But keep all if we'd have fewer than 5)
        if (subject.neighborhood) {
            var neighborhoodFiltered = filtered.filter(function(p) {
                return p.neighborhood === subject.neighborhood;
            });
            if (neighborhoodFiltered.length >= 5) {
                filtered = neighborhoodFiltered;
            }
        }

        return Promise.resolve(filtered);
    };

    // ==================== API MODE (FUTURE) ====================

    MLSAdapter.prototype._searchAPI = function(subject, type) {
        // Future implementation: call backend proxy
        // The backend would authenticate with MLS Grid RESO Web API
        // and return standardized property objects
        console.warn('API mode not yet implemented. Using mock data.');
        return this._searchMock(subject, type);
    };

    MLSAdapter.prototype._fetchAllAPI = function() {
        console.warn('API mode not yet implemented. Using mock data.');
        return Promise.resolve(global.MOCK_PROPERTIES || []);
    };

    // ==================== EXPORT ====================

    global.MLSAdapter = MLSAdapter;

})(window);
