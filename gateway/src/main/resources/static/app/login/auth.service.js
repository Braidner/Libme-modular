(function () {
    angular.module('app.auth')
        .factory('AuthService', AuthService)
        .factory('AuthResource', AuthResource);

    AuthService.$inject = ['AuthResource', '$http', '$httpParamSerializer', '$cookies', '$rootScope'];
    function AuthService(AuthResource, $http, $httpParamSerializer, $cookies, $rootScope) {
        var self = this;

        self.isAuthenticated = false;
        self.login = login;

        function login(email, password) {
            AuthResource.auth($httpParamSerializer(
                {
                    scope: 'ui',
                    username: email,
                    password: password,
                    grant_type: 'password'
                }
            )).$promise.then(function (data) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
                $cookies.put("access_token", data.access_token);
                self.isAuthenticated = true;
                $rootScope.$broadcast('oauth:login', data);
                console.log(data);
            }, function () {
                self.isAuthenticated = false;
                $rootScope.$emit('oauth:login');
            });
        }

        return self;
    }

    AuthResource.$inject = ['$resource'];
    function AuthResource($resource) {
        return $resource('/api/auth/:path/:token', {}, {
            'auth': {
                method: 'POST', params: {path: 'oauth', token: 'token'}, isArray: false, headers: {
                    'Authorization': 'Basic YnJvd3Nlcjo=',
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                }
            }
        });
    }
})();