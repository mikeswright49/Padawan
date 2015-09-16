﻿'use strict';
define('padawan/service/debounce', [], function () {
    return function ($timeout) {
        var timeout;
        return function (func, wait, immediate) {
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                $timeout.cancel(timeout);
                timeout = $timeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
    };
});