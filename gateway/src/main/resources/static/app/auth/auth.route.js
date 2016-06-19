(function () {
    'use strict';

    angular.module('app.auth')
        .run(RouteInterceptor)
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/app/auth/login.html'
        });
    }

    RouteInterceptor.$inject = ['$rootScope', '$location', 'AuthService'];
    function RouteInterceptor($rootScope, $location, AuthService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //jshint debug: true
            debugger;
            console.log(AuthService.isAuthenticated + ' : ' + next.$$route.originalPath);
            if (!AuthService.isAuthenticated && next.$$route.originalPath != '/login') {

                event.preventDefault();

                console.log('need auth');
                $location.path('/login');
            }
        });
    }
})();