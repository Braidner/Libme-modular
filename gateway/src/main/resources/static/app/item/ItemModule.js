/**
 * Created by goodl on 3/9/2016.
 */
(function () {
    angular.module('ItemModule', [])
        .directive('contentItem', contentItem);

    contentItem.$inject = ['$location'];
    function contentItem($location) {
        function linker(scope, element, attr) {
            element.on('click', function (event) {
                $location.path("/" + angular.lowercase(scope.item.type) +"/" + scope.item.id);
                scope.$apply();
            });
        }
        return {
            link: linker,
            restrict: 'E',
            replace: true,
            scope: {
                item: '='
            },
            templateUrl: '/app/item/item.html'
        };
    }
})();