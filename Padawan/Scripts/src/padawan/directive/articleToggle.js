'use strict';
define('padawan/directive/articleToggle', [], function () {
    var htmlTemplate =
        '<div>'
        + '<h3><a href=""ng-click="toggle()">Articles</a></h3><ul  ng-show="showArticles" >'
            +'<li ng-repeat="article in articles"><a ng-href="#!/article/{{article.url}}">{{article.title}}</a></li>'
        +'</ul>'
        +'</div>'
    return function () {
        return {
            restrict: "E",
            scope: {
                articles: '='
            },
            replace: true,
            template: htmlTemplate,
            link: function (scope, element, attrs) {
                scope.showArticles = true;
                scope.toggle = function () {
                    scope.showArticles = !scope.showArticles;
                }
            }
        }
    }
});