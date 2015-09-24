'use strict';
define('google/factory/eventsFactory', [], function () {
    return function (ga, eventOptions) {
        function pushEvent(eventCategory, eventAction, eventLabel) {
            ga('send', eventOptions.googlePush.event, eventCategory, eventAction, eventLabel);
        }
        function pushPage(path, title, loadTime) {
            setParameter({ 'path': path, 'title': title });
            ga('send', 'timing', 'Load times', 'Page Load', loadTime, title, { 'page': path });
            ga('send', eventOptions.googlePush.pageView);
        }
        function setParameter(values) {
            ga('set', values);
        }
        return {
            pushEvent: pushEvent,
            pushPage: pushPage,
            setParameter: setParameter
        };
    };
});