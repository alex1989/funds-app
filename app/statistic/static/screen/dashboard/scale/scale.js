

(function() {
    'use strict';

    function ScaleController(
        $scope,
        fundsApi
    ) {
        var createChart = function(title, series) {
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
                series: series
            });   
        };


        var getFundData = function(fund){
                fundsApi.getFundData(fund.id)
                        .then(function(response) {
                            if (response.data) {
                                var currentOperation,
                                    operations = {
                                        more: function(value) {
                                            return (value - 8);
                                        },
                                        less: function(value) {
                                            return value * 10;
                                        }
                                    };

                                fund.data = response.data.map(function(item) {
                                    if (item.value > 100 && !currentOperation) {
                                        currentOperation = operations.more;
                                    } else if (item.value < 100 && !currentOperation) {
                                        currentOperation = operations.less;
                                    }
                                    return [item.timestamp, currentOperation(item.value)];
                                });

                                $scope.lastedFunds--;
                            }
                        });
            },
            prepareDataForFunds = function(funds) {
                $scope.lastedFunds = funds.length;
                funds.forEach(function(fund) {
                    getFundData(fund);
                })
            };


        fundsApi.getFunds()
                .then(function(response) {
                    $scope.funds = response.data;
                    prepareDataForFunds($scope.funds);
                });


        

        $scope.$watch('lastedFunds', function(newVal, oldVal) {
            if (newVal === 0) {
                createChart('Scale Chart', $scope.funds.map(function(fund){
                    return {
                        name: fund.name,
                        data: fund.data
                    }
                }))
            }
        });

    }

    angular.module('funds.dashboard.screen')
        .controller(
        'ScaleController',
        [
            '$scope',
            'funds.services.funds_api',
            ScaleController
        ]
    );

    angular.module('funds.dashboard')
        .config(function($stateProvider) {
            $stateProvider.state('dashboard.scale', {
                url: '/scale/',
                templateUrl: '/static/screen/dashboard/scale/scale.html'
            });
        });
}());
