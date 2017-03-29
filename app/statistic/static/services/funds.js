
(function() {
    'use strict';

    function ApiFunds(
        $http
    ) {

        this.getFunds = function() {
            return $http.get('/api/v1/funds')
        }
        this.getFundData = function(fundId) {
            return $http.get('/api/v1/funds/'+fundId)
        }
    }


    angular.module('funds.services').service(
        'funds.services.funds_api',
        [
            '$http',
            ApiFunds
        ]
    );
}());
