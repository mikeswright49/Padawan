'use strict';
define('padawan/directive/ngEnter', [], function () {
    return function () {
        return{
            link: function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    var key = event.which ? event.which : event.keyCode;
                    if (key === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    }
});