'use strict';
define('padawan/controller/articleController', [], function () {
    var controller = function ($scope, $routeParams, padawanService) {
        padawanService.getArticle($routeParams.article, function (data) {
            $scope.title = data.title;
            $scope.body = data.body;
        })
    }
    return controller;
});