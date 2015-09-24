'use strict';
define('google/spec/analyticsSpec', ['google/application/analytics'], function () {

    var mockResults = {};
    var mockFactory = {

        pushEvent: function (eventCategory, eventAction, eventLabel) {
            mockResults.eventCategory = eventCategory,
            mockResults.eventAction = eventAction,
            mockResults.eventLabel = eventLabel
        },
        pushPage: function (path, title) {
            mockResults.path = path,
            mockResults.title = title
        }
        
    };
    var mockGA = function (func) {
        mockResults.function = func;
        mockResults.arguments = Array.prototype.slice.call(arguments, 1);
    };

    describe("Module: Google Analytics", function () {
        it("Should be able to compile", function () {
            expect(function () { module('googleAnalytics') }).not.toThrow();
        });

        describe("Running: Route Change", function () {
            var rootScope = null;
            beforeEach(function () {
                module('googleAnalytics', function ($provide) {
                    $provide.value('googleAnalytics.eventsFactory', mockFactory);
                });
            });
            beforeEach(inject(function ($rootScope) {
                rootScope = $rootScope;
            }));
            it('Should push page events on navigation', function () {
                spyOn(mockFactory, 'pushPage').and.callThrough();
                rootScope.$broadcast('$routeChangeStart');
                expect(mockFactory.pushPage).not.toHaveBeenCalled();
                rootScope.$broadcast('$routeChangeSuccess');
                expect(mockFactory.pushPage).toHaveBeenCalled();
            });
        });
        describe("Directive: analyticsEvent", function () {
           
            beforeEach(function () {
                mockResults = {};
                module('googleAnalytics', function ($provide) {
                    $provide.value('googleAnalytics.eventsFactory', mockFactory);
                });
            });
            var element, scope, compile;
            beforeEach(inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                scope.bacon = "bacon";
                scope.eaten = "eaten";
                element = '<div analytics-event="strip" event="bacon" action="eaten"></div>';
                compile = $compile;
                scope.$digest();
            }));
            it("Should be able to compile", function () {
                expect(function () {
                    element = compile(element)(scope);
                    scope.$digest();
                }).not.toThrow();
            });
            it("Should be able to handle click events", function () {
                element = compile(element)(scope);
                scope.$digest();
                var event = jQuery.Event("keydown", {
                    keyCode: 13
                });

                element.trigger(event);
                expect(mockResults.eventLabel).toBe(undefined);

                event = jQuery.Event("click", {});
                element.trigger(event);

                expect(mockResults.eventCategory).toBe('bacon');
                expect(mockResults.eventAction).toBe('eaten');
                expect(mockResults.eventLabel).toBe('strip');
            })
        });
        describe("Factory: eventsFactory", function () {
            var factory = null;
            beforeEach(function () {
                mockResults = {};
                module('googleAnalytics', function ($provide) {
                    $provide.constant('ga', mockGA);
                });
            });
            beforeEach(inject(['googleAnalytics.eventsFactory', function (eventsFactory) {
                factory = eventsFactory;
            }]));
            it('Should be able to initialize', function () {
                expect(!factory).toBe(false);
            });
            it('Should be able to push events', function () {
                factory.pushEvent('category', 'action', 'label');
                expect(mockResults.function).toBe('send');
                expect(!mockResults.arguments).toBe(false);
                expect(mockResults.arguments[0]).toBe('event');
                expect(mockResults.arguments[1]).toBe('category');
                expect(mockResults.arguments[2]).toBe('action');
                expect(mockResults.arguments[3]).toBe('label');
            });
            it('Should be able to set google analytis values', function () {
                var param = {bacon:'sliced'};
                factory.setParameter(param);
                expect(mockResults.function).toBe('set');
                expect(!mockResults.arguments).toBe(false);
                expect(mockResults.arguments[0]).toEqual(param);
            });
            it('Should be able to set page navigation events', function () {
                factory.pushPage('page title', '/page-path');
                expect(mockResults.function).toBe('send');
                expect(mockResults.arguments).toEqual(['pageview']);
            });
        });
    });
});