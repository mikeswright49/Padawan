'use strict';
define('padawan/application/padawanApp', [
    'padawan/controller/padawanController',
    'padawan/controller/articleController',
    'padawan/service/padawanService',
    'padawan/service/debounce',
    'padawan/directive/articleToggle',
    'padawan/directive/nestedApplication',
    'padawan/directive/ngEnter',
    'padawan/filter/padawanFilter'], function (padawanController, articleController, padawanService, debounce, articleToggle, nestedApplication, ngEnter, padawanFilter) {
        var controllerProvider = null;
        var providerApplication = angular.module('providerApp',[]);
        providerApplication.service('providerApp.privateProvider', [function () {
            var self = this;
            self.providers = [];
            return {
                get: function (provider) {
                    return self.providers[provider];
                },
                set: function (provider, newValue) {
                    self.providers[provider] = newValue;
                }
            }
        }]);

        var application = angular.module('padawanApp', ['ngRoute', 'ngResource', 'ngSanitize', 'providerApp'], function ($controllerProvider) {
            controllerProvider = $controllerProvider;
        });

        application.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', { templateUrl: '/padawan/partial/mainview', controller: 'padawan.padawanController' })
                .when('/article/:article', { templateUrl: '/padawan/partial/article', controller: 'padawan.articleController' });
            $routeProvider.otherwise({ redirectTo: "/" });
            $locationProvider.html5Mode(false).hashPrefix("!");
        }]);

    application.service('padawan.padawanService', ['$resource', padawanService]);
    application.service('$debounce', ['$timeout', debounce]);

    application.controller('padawan.padawanController', ['$scope', 'padawan.padawanService', padawanController]);
    application.controller('padawan.articleController', ['$scope', '$routeParams', 'padawan.padawanService', articleController]);

    application.directive('articleToggle', [articleToggle]);
    application.directive('ngEnter', [ngEnter]);
    application.directive('nestedApplication', ['providerApp.privateProvider', '$http', '$compile', '$timeout', nestedApplication]);

    application.filter('padawan.padawanFilter', [padawanFilter]);

    application.run(['providerApp.privateProvider', function (privateProvider) {
        privateProvider.set('$controllerProvider', controllerProvider);
        privateProvider.set('invokeQueue', angular.module('padawanApp')._invokeQueue);
    }])
    return application;
})