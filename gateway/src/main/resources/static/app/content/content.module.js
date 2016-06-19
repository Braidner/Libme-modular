/**
 * Created by goodl on 3/9/2016.
 */

(function () {
    angular.module('ContentModule', ['ContentServices'])
        .config(RouteConfig)
        .controller('AllContentCtrl', AllContentCtrl)
        .controller('SerialContentCtrl', SerialContentCtrl)
        .controller('FilmContentCtrl', FilmContentCtrl);

    function RouteConfig($routeProvider) {
        "ngInject";
        $routeProvider.when('/', {
            templateUrl: '/app/content/content.html',
            controller: 'AllContentCtrl'
        }).when('/film', {
            templateUrl: '/app/content/content.html',
            controller: 'FilmContentCtrl'
        }).when('/serial', {
            templateUrl: '/app/content/content.html',
            controller: 'SerialContentCtrl'
        });
    }

    AllContentCtrl.$inject = ['$scope', 'ContentService'];
    function AllContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent();
    }

    FilmContentCtrl.$inject = ['$scope', 'ContentService'];
    function FilmContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent(null, 'Film');
    }

    SerialContentCtrl.$inject = ['$scope', 'ContentService'];
    function SerialContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent(null, 'Serial');
    }
})();