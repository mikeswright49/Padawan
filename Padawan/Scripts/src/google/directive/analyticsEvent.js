'use strict';
define('google/directive/analyticsEvent', [], function () {
    return function (eventsFactory) {
        return {
            restrict: 'A',
            scope: {
                event: '=',
                action: '='
            },
            link: function linkFunction(scope, element, attrs) {
                scope.analyticsEvent = attrs.analyticsEvent;
                element.bind('click', function () {
                    eventsFactory.pushEvent(scope.event, scope.action, scope.analyticsEvent);
                });
            }
        }
    }
});
