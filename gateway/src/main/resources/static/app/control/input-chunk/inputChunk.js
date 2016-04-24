(function () {
    angular.module('control.input-chunk', []);
    angular.module('control.input-chunk')
        .directive('lmInputChunk', inputChunk);
    
    
    function inputChunk() {
        return {
            scope: {
                bindModel:'=ngModel'
            },
            require: 'ngModel',
            // replace: true,
            transclude: true,
            'templateUrl': '/app/control/input-chunk/input-chunk.html',
            link: function (scope, elem, attr, ngModel) {
                "use strict";
            }
        };
    }
})();