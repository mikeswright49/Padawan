'use strict';
define('google/model/eventOptions', [], function () {
    var googlePush = {
        event: 'event',
        pageView: 'pageview'
    }
    var eventCategory = {
        navigation: "navigation"
    };
    var eventAction = {
        pageView: {
            linkClicked: "link",
            buttonClicked:"button"
        }
    };

    return {
        eventCategory: eventCategory,
        eventAction: eventAction,
        googlePush: googlePush
    };
});