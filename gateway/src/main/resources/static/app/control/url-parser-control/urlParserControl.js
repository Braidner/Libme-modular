/**
 * Created by KuznetsovNE on 04.04.2016.
 */
(function () {
    angular.module('control.parser', []);

    angular.module('ControlsModule').directive('lmUrlParser', lmUrlParser);

    lmUrlParser.$inject = ['$location', '$http', 'UploadData'];
    function lmUrlParser($location, $http, UploadData) {
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
                    $http.get('/rest/kinopoisk', {params: {url: scope.bindModel}}).then(function (responce) {
                        responce.data.url = scope.bindModel;
                        UploadData.set(responce.data);
                        $location.path('/upload');
                    });
                });
            }
        };
    }

})();