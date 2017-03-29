(function() {
    'use strict';

    function MonthFrequencyListController(
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
        'MonthFrequencyListController',
        [
            '$scope',
            'funds.services.funds_api',
            MonthFrequencyListController
        ]
    );

    angular.module('funds.dashboard')
           .config(function($stateProvider) {
               $stateProvider.state('dashboard.month_frequency', {
                   url: '/month-frequency',
                   //template: '<h1>Funds</h1>'
                   templateUrl: '/static/screen/dashboard/month-frequency/funds.html'
               });
           });
}());
