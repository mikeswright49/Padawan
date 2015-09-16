'use strict';
define('padawan/service/padawanService', [], function () {
    var service = function($resource){
        var apiResource = $resource('/api/data/:title');
        var self = this;
        self.cache = [];
        
        var getContent = function (title, callback) {
            if (!self.cache[title]) {
                self.cache[title] = apiResource.get({ 'title': title });
            }
            self.cache[title].$promise.then(callback);
        };
        var getArticle = function (title, callback) {
            getContent("article/" + title, callback);
        };
        var getPage = function (title, callback) {
            getContent("page/" + title, callback);
        }
        return {
            getArticle: getArticle,
            getPage: getPage
        }
    }

    return service;
});