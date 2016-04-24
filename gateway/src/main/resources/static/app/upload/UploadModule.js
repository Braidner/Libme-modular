/**
 * Created by Braidner on 06/03/2016.
 */
(function () {
    'use strict';

    angular.module('UploadModule', ['ngResource']);
    angular.module('UploadModule').config(RouteConfig);
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);
    angular.module('UploadModule').factory('UploadData', UploadData);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: '/app/upload/upload.html',
            controller: 'UploadCtrl'
        });
    }
    

    UploadCtrl.$inject = ['$scope', 'UploadData'];
    function UploadCtrl($scope, UploadData) {
        var content = UploadData.get();
        console.log(content);
        UploadData.set(null);
        console.log(content);
        if (content) {
            $scope.content = content;
        }
    }

    function UploadData() {
        var uploadData = {};
        function set(data) {
            uploadData = data;
        }
        function get() {
            return uploadData;
        }

        return {
            set: set,
            get: get
        };
    }

})();