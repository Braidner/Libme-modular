/**
 * Created by goodl on 3/13/2016.
 */
(function () {
    angular.module('ContentCardModule', []);
    
    angular.module('ContentCardModule')
        .config(RouteConfig)
        .controller('FilmCardCtrl', FilmCardCtrl)
        .controller('SerialCardCtrl', SerialCardCtrl);

    function RouteConfig($routeProvider) {
        "ngInject";
        $routeProvider.when('/film/:content_id', {
            templateUrl: '/app/content-card/content-card.html',
            controller: 'FilmCardCtrl'
        }).when('/serial/:content_id', {
            templateUrl: '/app/content-card/content-card.html',
            controller: 'SerialCardCtrl'
        });
    }

    function FilmCardCtrl() {
        "ngInject";
    }

    function SerialCardCtrl() {
        "ngInject";
    }
    
})();