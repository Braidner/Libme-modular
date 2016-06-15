/**
 * Created by goodl on 3/21/2016.
 */
(function () {
    'use strict';
    
    angular.module('ProfileModule', []);
    angular.module('ProfileModule').config(RouteConfig);
    angular.module('ProfileModule').run(ProfileConfig);
    angular.module('ProfileModule').controller('ProfileCtrl', ProfileCtrl);

    function RouteConfig($routeProvider) {
        "ngInject";
        $routeProvider.when('/profile', {
            templateUrl: '/app/profile/profile.html',
            controller: 'ProfileCtrl'
        });
    }
    
    function ProfileConfig($rootScope) {
        $rootScope.profile = {login: "Braidner", perms: ['user:edit:profile']};
        $rootScope.hasPermission = hasPermission;

        function hasPermission(perm) {
            return profile.perms.indexOf(perm) > -1;
        }
    }

    function ProfileCtrl() {
    }
    
})();