/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: '/app/upload/upload.html',
            controller: 'UploadCtrl'
        });
    }
    
})();