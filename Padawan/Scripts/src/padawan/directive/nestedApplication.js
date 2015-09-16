'use strict';
define('padawan/directive/nestedApplication', [], function () {

    var nestedDirective = function (privateProvider, $http, $compile, $timeout) {

        function registerController(moduleName, controllerName) {
            // Here I cannot get the controller function directly so I
            // need to loop through the module's _invokeQueue to get it
            var queue = privateProvider.get('invokeQueue');
            for (var i = 0; i < queue.length; i++) {
                var call = queue[i];
                if (call[0] == "$controllerProvider" &&
                    call[1] == "register" &&
                    call[2][0] == controllerName) {
                    privateProvider.get('$controllerProvider').register(controllerName, call[2][1]);
                }
            }
        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        return {
            scope: {
                path: '@',
                application:'@'
            },
            restrict: 'E',
            link: function (scope, element, attrs, controller) {
                $http.get(scope.path+"?&application="+scope.application).success(function (data) {
                    var id = guid();
                    element.html('<div id="' + id + '">' + data.Template + '</div>');
                    $timeout(function () {
                        angular.forEach(data.Controllers, function (controller) {
                            registerController(scope.application, controller);
                        });
                        angular.injector([scope.application]).invoke(function ($compile, $rootScope) {
                            $compile(element.html())($rootScope);
                        });
                    }, 0, false);
                   

                });
            }
        }
    }

    return nestedDirective;


})