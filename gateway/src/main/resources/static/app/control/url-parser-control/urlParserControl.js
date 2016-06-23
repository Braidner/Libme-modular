/**
 * Created by KuznetsovNE on 04.04.2016.
 */
(function () {
    angular.module('control.parser', ['ngResource']);

    angular.module('ControlsModule')
        .directive('lmUrlParser', lmUrlParser)
        .factory('DiscoveryResource', DiscoveryResource);

    lmUrlParser.$inject = ['$location', 'UploadData', 'DiscoveryResource'];
    function lmUrlParser($location, UploadData, DiscoveryResource) {
        return {
            scope: {
                bindModel:'=ngModel'
            },
            require: 'ngModel',
            // replace: true,
            transclude: true,
            'templateUrl': '/app/control/url-parser-control/url-parser-control.html',
            link: function (scope, elem, attr, ngModel) {
                "use strict";
                elem.find('.button').on('click', function () {
                    DiscoveryResource.get({id: scope.bindModel.match(/\/film\/(\d*)\//)[1]})
                        .$promise.then(function (responce) {
                        responce.url = scope.bindModel;
                        UploadData.set(responce);
                        $location.path('/upload');
                    });
                });
            }
        };
    }

    DiscoveryResource.$inject = ['$resource'];
    function DiscoveryResource($resource) {
        return $resource('/api/content/discovery/:id');
    }

})();