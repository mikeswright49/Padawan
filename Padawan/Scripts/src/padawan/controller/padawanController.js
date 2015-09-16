'use strict';
define('padawan/controller/padawanController', [], function () {
    var controller = function ($scope, padawanService) {
        $scope.articles = [];
        padawanService.getPage('mainPage', function (data) {
            $scope.articles = data.articles;
            $scope.title = data.title;
            $scope.body = data.body;
        })

    }
    return controller;
})