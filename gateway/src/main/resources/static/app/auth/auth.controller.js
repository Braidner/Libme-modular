(function () {
    'use strict';
    angular.module('app.auth').controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', "$location", '$scope'];
    function LoginController(AuthService, $location, $scope) {
        var self = this;
        self.email = 'Braidner';
        self.password = '12345';

        self.auth = auth;

        $scope.$on('oauth:login', function (token) {
            console.log(AuthService.isAuthenticated);
            if (AuthService.isAuthenticated) {
                $location.path('/');
            }
        });

        function auth(login, password) {
            AuthService.login(login, password);
        }
    }
})();