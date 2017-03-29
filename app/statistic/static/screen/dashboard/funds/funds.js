(function() {
    'use strict';

    function FundController(
        $scope,
        fundsApi
    ) {
        fundsApi.getFunds()
                .then(function(response) {
                    $scope.funds = response.data;
                })
    }

    angular.module('funds.dashboard.screen')
        .controller(
        'FundController',
        [
            '$scope',
            'funds.services.funds_api',
            FundController
        ]
    );

    angular.module('funds.dashboard')
           .config(function($stateProvider) {
               $stateProvider.state('dashboard.funds', {
                   url: '/funds',
                   //template: '<h1>Funds</h1>'
                   templateUrl: '/static/screen/dashboard/funds/funds.html'
               });
           });
}());
