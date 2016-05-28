/**
 * Created by Braidner on 06/03/2016.
 */
(function () {
    'use strict';

    angular.module('UploadModule', ['ngResource']);
    angular.module('UploadModule').config(RouteConfig);
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);
    angular.module('UploadModule').service('UploadService', UploadService);
    angular.module('UploadModule').factory('UploadData', UploadData);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: '/app/upload/upload.html',
            controller: 'UploadCtrl'
        });
    }
    

    UploadCtrl.$inject = ['$scope', 'UploadData', 'UploadService'];
    function UploadCtrl($scope, UploadData, UploadService) {
        var self = this;
        var content = UploadData.get();
        UploadData.set(null);
        if (content) {
            $scope.content = content;
        }
        
        self.createContent = UploadService.createContent;
    }
    
    UploadService.$inject = ['UploadData', '$resource'];
    function UploadService(UploadData, $resource) {
        
        function service() {
            
        }
        
        service.createContent = createContent;

        var ContentResource = $resource('rest/content');
        
        function createContent() {
            var content = uploadData.get();
            var createdContent = new ContentResource(content);
            return createdContent.id;
        }

        return service;
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