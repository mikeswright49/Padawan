'use strict';
define('google/application/analytics', ['google/directive/analyticsEvent', 'google/factory/eventsFactory', 'google/model/eventOptions'], function (analyticsEvent, eventsFactory, eventOptions) {
    var analytics = angular.module('googleAnalytics', ['ngRoute']);
    analytics.constant('ga', ga);
    analytics.constant('googleAnalytics.eventOptions', eventOptions)
    analytics.factory('googleAnalytics.eventsFactory', ['ga', 'googleAnalytics.eventOptions', eventsFactory]);
    analytics.directive('analyticsEvent', ['googleAnalytics.eventsFactory', analyticsEvent]);
    analytics.run(['$location', "$rootScope", "googleAnalytics.eventsFactory", function ($location, $rootScope, eventsfactory) {
        var self = {};
        $rootScope.$on("$routeChangeSuccess", function (event, current) {
            eventsfactory.pushPage(location.pathname + '#!' + $location.$$path, $rootScope.title);
        });
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            self.startTime = new Date();
        });
    }]);
    return analytics;
});