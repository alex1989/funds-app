

(function() {
    'use strict';

    function MonthFrequencyController(
        $scope,
        $stateParams,
        fundsApi
    ) {
        var createChart = function(title, data) {
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];


            var categories = data.map(function(item) {
                    return monthNames[item.date.getMonth()] + ' ' + item.date.getFullYear();
                }),
                values = data.map(function(item) {
                    return item.value;
                });
            return new Highcharts.Chart({
                chart: {
                    renderTo: document.getElementById('chart'),
                    type: 'column',
                },
                title: {
                    text: 'Month Frequency',
                    align: 'left',
                    x: 0
                },

                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: categories,
                },

                yAxis: {
                    title: {
                        text: null
                    },
                    min: 0,
                    max: 1
                },


                legend: {
                    enabled: false
                },

                series: [{
                    name: title,
                    data: values
                }]

            })
        };


        fundsApi.getFundData($stateParams.fundsId)
                .then(function(response) {
                    if (response.data) {
                        $scope.chartBarData = response.data.map(function(item){
                                return {
                                    date: new Date(item.timestamp),
                                    value: parseFloat(item.value)
                                }
                            }).filter(function(item){
                                var lastDay = new Date(item.date.getFullYear(), item.date.getMonth() + 1, 0).getDate();
                                return item.date.getDate() == lastDay;
                            }).map(function(item, idx, arr) {
                                var value = 1
                                if (idx != 0) {
                                    value = (item.value - arr[idx-1].value) / arr[idx-1].value;
                                }
                                return {
                                    date: item.date,
                                    value: value
                                }
                            }).splice(1)

                        $scope.title = response.data[0].name;
                        createChart($scope.title, $scope.chartBarData);
                    }
                    
                })

    }

    angular.module('funds.dashboard.screen')
        .controller(
        'MonthFrequencyController',
        [
            '$scope',
            '$stateParams',
            'funds.services.funds_api',
            MonthFrequencyController
        ]
    );

    angular.module('funds.dashboard')
        .config(function($stateProvider) {
            $stateProvider.state('dashboard.month_frequency_detail', {
                url: '/month-frequency/{fundsId}',
                templateUrl: '/static/screen/dashboard/month-frequency/detail/detail.html'
            });
        });
}());
