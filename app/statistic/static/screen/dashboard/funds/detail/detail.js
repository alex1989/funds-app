

(function() {
    'use strict';

    function FundDetailController(
        $scope,
        $stateParams,
        fundsApi
    ) {
        var createChart = function(title, data) {
            return Highcharts.chart('chart', {
                title: {
                    text: title
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Fund rate'
                    }
                },
                series: [{
                    name: 'title',
                    data: data
                }]
            });   
        };


        fundsApi.getFundData($stateParams.fundsId)
                .then(function(response) {
                    if (response.data) {
                        $scope.data = response.data.map(function(item) {
                            return [item.timestamp, parseFloat(item.value)]
                        });
                        $scope.title = response.data[0].name;
                        createChart($scope.title, $scope.data);
                    }
                    
                })

    }

    angular.module('funds.dashboard.screen')
        .controller(
        'FundDetailController',
        [
            '$scope',
            '$stateParams',
            'funds.services.funds_api',
            FundDetailController
        ]
    );

    angular.module('funds.dashboard')
        .config(function($stateProvider) {
            $stateProvider.state('dashboard.funds_detail', {
                url: '/funds/{fundsId}',
                templateUrl: '/static/screen/dashboard/funds/detail/detail.html'
            });
        });
}());
