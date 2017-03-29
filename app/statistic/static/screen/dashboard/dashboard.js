(function() {
    'use strict';

    angular.module('funds.dashboard')
           .config(function($stateProvider) {
                $stateProvider.state('dashboard', {
                    url: '',
                    template: '<ui-view></ui-view>'
                });
           });
}());
