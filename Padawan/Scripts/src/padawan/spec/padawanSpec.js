'use strict';
define(['padawan/application/padawanApp']
        , function () {

            describe("Module: Padawan", function () {
                it("Should be able to initialize", function () {
                    expect(function () { module('padawanApp') }).not.toThrow();
                });
                describe("Routing: Padawan", function () {
                    var route, location, rootScope, httpBackend;
                    beforeEach(function () {
                        module('padawanApp');
                    })
                    beforeEach(
                        inject(function ($route, $location, $rootScope, $httpBackend) {
                            route = $route;
                            location = $location;
                            rootScope = $rootScope;
                            httpBackend = $httpBackend;
                        })
                    );

                    it('Should route to default', function () {
                        httpBackend.expectGET('/padawan/partial/mainview').respond(200);
                        expect(route.current).toBeUndefined();
                        location.path('/OH-MY-GOD-A-FAKE-URL-THIS-IS-TERRIBLE');
                        rootScope.$digest();
                        expect(location.path()).toBe('/');
                    });
                    it('Should route to the main page', function () {
                        httpBackend.expectGET('/padawan/partial/mainview').respond(200);
                        location.path('/');
                        rootScope.$digest();
                        expect(location.path()).toBe('/');
                        expect(route.current.templateUrl).toEqual('/padawan/partial/mainview');
                        expect(route.current.controller).toBe('padawan.padawanController');

                    });
                    it('Should route to an article page', function () {
                        httpBackend.expectGET('/padawan/partial/article').respond(200);
                        location.path('/article/aNewArticle');
                        rootScope.$digest();
                        expect(location.path()).toBe('/article/aNewArticle');
                        expect(route.current.templateUrl).toEqual('/padawan/partial/article');
                        expect(route.current.controller).toBe('padawan.articleController');
                    });

                });
                describe("Controller: padawanController", function () {
                    var mockScope = {};
                    var mockService = {};
                    var mockResponse = {};
                    var $controller;
                    beforeEach(function () {

                        mockScope = {};
                        mockService = {
                            getPage: function (title, callback) {
                                callback(mockResponse);
                            }
                        };
                        mockResponse = {
                            title: 'backon',
                            articles: [{}, {}, {}],
                            body: "A body"
                        };
                        module('padawanApp', function ($provide) {
                            $provide.value('padawan.padawanService', mockService);
                        });
                    });
                    beforeEach(inject(function (_$controller_) {
                        $controller = _$controller_;
                    }))

                    it("Should initialize scope.articles", function () {
                        var testedController = $controller('padawan.padawanController', { $scope: mockScope, padawanService: mockService });
                        expect(!mockScope.articles).toBe(false);
                    });
                    it("Should call the service on initialization", function () {
                        var testedController = $controller('padawan.padawanController', { $scope: mockScope, padawanService: mockService });
                        expect(!mockScope.title).toBe(false);
                        expect(mockScope.articles.length).toBe(mockResponse.articles.length);
                        expect(!mockScope.body).toBe(false);
                    })
                });
                describe("Controller: articleController", function () {
                    var mockScope = {};
                    var mockService = {};
                    var mockResponse = {};
                    var mockParams = { article: 'aNewArticle' };
                    var $controller;
                    beforeEach(function () {
                        mockScope = {};
                        mockService = {
                            getArticle: function (title, callback) {
                                callback(mockResponse);
                            }
                        };
                        mockResponse = {
                            title: 'backon',
                            articles: [{}, {}, {}],
                            body: "A body"
                        };
                        module('padawanApp', function ($provide) {
                            $provide.value('padawan.padawanService', mockService);
                        });
                    });
                    beforeEach(inject(function (_$controller_) {
                        $controller = _$controller_;
                    }))
                    it("Should call the service on initialization", function () {
                        spyOn(mockService, 'getArticle').and.callThrough();
                        var testedController = $controller('padawan.articleController', { $scope: mockScope, $routeParams: mockParams, padawanService: mockService });
                        expect(mockScope.title).toBe(mockResponse.title);
                        expect(mockScope.body).toBe(mockResponse.body);
                        expect(mockService.getArticle).toHaveBeenCalled();
                    })
                });
                describe("Service: padawanService", function () {
                    var service, httpBackend;

                    beforeEach(function () { module('padawanApp') });
                    beforeEach(inject(['padawan.padawanService', '$httpBackend',
                        function (padawanService, $httpBackend) {
                            httpBackend = $httpBackend;
                            service = padawanService;
                        }]));
                    afterEach(function () {
                        httpBackend.verifyNoOutstandingExpectation();
                        httpBackend.verifyNoOutstandingRequest();
                    })
                    it('Should be able to call promises and callback for pages', function () {
                        var i = 0;
                        httpBackend.when('GET', '/api/data/page%2Fpage').respond({});
                        var initialRequest = service.getPage('page', function (data) {
                            i++;
                        });
                        httpBackend.flush();

                        expect(i).toBe(1);
                    });
                    it('Should be able to call promises and callback for articles', function () {
                        var i = 0;
                        httpBackend.when('GET', '/api/data/article%2Farticle').respond({});
                        var initialRequest = service.getArticle('article', function (data) {
                            i++;
                        });
                        httpBackend.flush();

                        expect(i).toBe(1);
                    })
                });
                describe("Service: $debounce", function () {
                    var timeout, service;
                    var i;
                    beforeEach(function () { module('padawanApp') });
                    beforeEach(inject(['$debounce', '$timeout',
                        function (debounce, $timeout) {
                            timeout = $timeout;
                            service = debounce;
                            i=0;
                        }]
                    ));
                    var testFunction = function () {
                        i++;
                    };

                    it("Should run the function if immediate", function () {
                        service(testFunction, 1, true)();
                        expect(i).toBe(1);
                        timeout.flush();
                        expect(i).toBe(1);
                    });
                    it("Should run the function if timeout is complete", function () {
                        service(testFunction, 0)();
                        timeout.flush();
                        expect(i).toBe(1);
                    });
                    it("Should run the function once when timeout is complete", function () {
                        service(testFunction, 1)();
                        service(testFunction, 1)();
                        service(testFunction, 1)();
                        service(testFunction, 1)();
                        service(testFunction, 1)();
                        service(testFunction, 1)();
                        timeout.flush();
                        expect(i).toBe(1);
                    });

                });
                describe("Directive: articleToggle", function () {
                    beforeEach(module('padawanApp'));
                    var element, scope, compile;
                    beforeEach(inject(function ($rootScope, $compile) {
                        scope = $rootScope.$new();
                        scope.articles = [
                            {
                                'title': "A title",
                                'url': "a-url"
                            },
                            {
                                'title': "A title",
                                'url': "a-url"
                            },
                            {
                                'title': "A title",
                                'url': "a-url"
                            }
                        ];
                        element = '<article-toggle articles="articles"></article-toggle>';
                        compile = $compile;
                        scope.$digest();
                    }));
                    it('should be able to compile and replace', function () {
                        expect(function () {
                            element = compile(element)(scope);
                            scope.$digest();
                        }).not.toThrow();
                        expect(element.html()).toContain('<h3>');
                    });
                    it('should use the ng-repeat to create the links lists', function () {
                        element = compile(element)(scope);
                        scope.$digest();
                        var lists = element.find('ul li a');
                        expect(lists.length).toBe(3);
                    });
                    it('should be able to toggle on click', function () {
                        element = compile(element)(scope);
                        scope.$digest();
                        var toggle = element.find('h3 a');
                        var list = element.find('ul');
                        toggle.triggerHandler('click');
                        expect(angular.element(list).hasClass('ng-hide')).toBe(true);
                        toggle.triggerHandler('click');
                        expect(angular.element(list).hasClass('ng-hide')).not.toBe(true);
                    });
                });
                describe("Directive: nestedApplication", function () {
                    //Angular Mocks does not involve the DOM as a result, embedded script tags cannot work, and 
                    //the controller functionality cannot be indirectly tested.
                    var registered = [];
                    var mockService = {
                        get: function (provider) {
                            if (provider == '$controllerProvider') {
                                return {
                                    register: function (controllerName) {
                                        registered.push(controllerName);
                                    }
                                }
                            }
                            else {
                                return [
                                    ['$controllerProvider', 'register', ['testNestedController']]
                                ]
                            }
                        },
                        set: function (provider, newValue) {

                        }
                    };

                    beforeEach(function () {
                        registered = [];
                        module("padawanApp", function ($provide) {
                            $provide.value('providerApp.privateProvider', mockService);
                        });
                    });
                    var element, scope, compile, httpBackend, timeout;
                    beforeEach(inject(function ($rootScope, $compile, $httpBackend, $timeout) {
                        scope = $rootScope.$new();
                        element = '<nested-application path="/padawan/application/NestedApplication" application="padawanApp"></nested-application>';
                        compile = $compile;
                        httpBackend = $httpBackend;
                        timeout = $timeout;
                        scope.$digest();
                    }));
                    afterEach(function () {
                        httpBackend.verifyNoOutstandingExpectation();
                        httpBackend.verifyNoOutstandingRequest();
                    });
                    it('Should be able to compile and retrieve the new content', function () {
                        httpBackend.when('GET', '/padawan/application/NestedApplication?&application=padawanApp').respond({
                            Template: '<script></script><div id="HelloWorld"></div>',
                            Controllers: ['nestedAppController']
                        });
                        element = compile(element)(scope);
                        scope.$digest();
                        httpBackend.flush();

                        expect(element.html().indexOf('HelloWorld')).not.toBe(-1);

                    });
                    it('Should be able to inject a controller from the template, and add it to the application queue', function () {
                        spyOn(mockService, 'get').and.callThrough();
                        httpBackend.when('GET', '/padawan/application/NestedApplication?&application=padawanApp').respond({
                            Template: '<script>'
                                + 'angular.module("padawanApp").controller("testNestedController", function(){})'
                                + '</script><div id="HelloWorld"></div>',
                            Controllers: ['testNestedController']
                        });
                        element = compile(element)(scope);
                        scope.$digest();
                        httpBackend.flush();
                        timeout.flush();
                        expect(mockService.get).toHaveBeenCalled();
                        expect(registered.length).toBe(1);
                        expect(registered[0]).toBe('testNestedController');
                    });
                });
                describe("Directive: ngEnter", function () {
                    beforeEach(module('padawanApp'));
                    var element, scope, compile;
                    beforeEach(inject(function ($rootScope, $compile) {
                        scope = $rootScope.$new();
                        scope.enterCount = 0;
                        scope.eventHandler = function () {
                            scope.enterCount++;
                        }
                        element = '<div ng-enter="eventHandler()"></div>';
                        compile = $compile;
                        scope.$digest();
                    }));
                    it('should be able to compile', function () {
                        expect(function () {
                            element = compile(element)(scope);
                            scope.$digest();
                        }).not.toThrow();
                    });
                    it('should be able to handle keydown enter events', function () {
                        element = compile(element)(scope);
                        scope.$digest();
                        var event  = jQuery.Event("keydown", {
                            keyCode: 13
                        });

                        element.trigger(event);
                        expect(scope.enterCount).toBe(1);

                        event = jQuery.Event("keyup", {
                            keyCode: 13
                        });

                        element.trigger(event);
                        expect(scope.enterCount).toBe(1);
                    });
                    it('should be able to ignore keyup enter events', function () {
                        element = compile(element)(scope);
                        scope.$digest();

                        event = jQuery.Event("keyup", {
                            keyCode: 13
                        });

                        element.trigger(event);
                        expect(scope.enterCount).toBe(0);
                    });
                });
                describe("Filter: padawanFilter", function () {
                    var data, filter;
                    var buildData = function (length) {
                        var data = [length];
                        for (var i = 0; i < length; i++) {
                            data[i] = {
                                value: i,
                                name: "Entry " + i
                            };
                        }
                        return data;
                    }
                    beforeEach(module('padawanApp'));
                    beforeEach(inject(function (_$filter_) {
                        filter = _$filter_;
                        data = buildData(10);
                    }))
                    it('Should be able to handle empty and null arrays', function () {
                        expect(filter('padawan.padawanFilter')().length).toBe(0);
                        expect(filter('padawan.padawanFilter')([]).length).toBe(0);
                    });
                    it('Should be able to handle <', function () {
                        expect(filter('padawan.padawanFilter')(data, 'value', '<', -1).length).toBe(0);
                        expect(filter('padawan.padawanFilter')(data, 'value', '<', 10).length).toBe(10);
                    });
                    it('Should be able to handle <=', function () {
                        expect(filter('padawan.padawanFilter')(data, 'value', '<=', 5).length).toBe(6);
                        expect(filter('padawan.padawanFilter')(data, 'value', '<=', 0).length).toBe(1);
                    });
                    it('Should be able to handle ==', function () {
                        expect(filter('padawan.padawanFilter')(data, 'value', '==', 5).length).toBe(1);
                        expect(filter('padawan.padawanFilter')(data, 'value', '==', 10).length).toBe(0);
                    });
                    it('Should be able to handle =>', function () {
                        expect(filter('padawan.padawanFilter')(data, 'value', '>=', 5).length).toBe(5);
                        expect(filter('padawan.padawanFilter')(data, 'value', '>=', 0).length).toBe(10);
                    });
                    it('Should be able to handle >', function () {
                        expect(filter('padawan.padawanFilter')(data, 'value', '>', 5).length).toBe(4);
                        expect(filter('padawan.padawanFilter')(data, 'value', '>', 10).length).toBe(0);
                    });
                });
            });
        })