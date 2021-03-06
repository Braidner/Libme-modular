/**
 * Created by goodl on 4/2/2016.
 */


angular.module('control.input-control', [])
    .directive('lmInput', lmInput);

function lmInput() {
    return {
        scope: {
            bindModel:'=ngModel',
            datatype: '@'
        },
        require: 'ngModel',
        transclude: true,
        'templateUrl': '/app/control/input/input-control.html',
        link: function (scope, elem, attr, ngModel) {
            "use strict";
            if (!scope.datatype) {
                scope.datatype = 'text';
            }
            // elem.on('click', function () {
            //     elem.addClass('lm-input-focused');
            // });
        }
    };
}