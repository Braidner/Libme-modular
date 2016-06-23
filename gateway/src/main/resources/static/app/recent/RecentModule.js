/**
 * Created by Braidner
 */
(function () {
    'use strict';

    angular.module('RecentModule', [])
        .controller("RecentCtrl", RecentCtrl);

    RecentCtrl.$inject = ['$scope'];
    function RecentCtrl($scope) {
        $scope.content = [
            {name: 'Zootopia', kinopoiskId: 775276, id: 0, type: 'film'},
            {name: 'Batman v Superman: Dawn of Justice', kinopoiskId: 770631, id: 0, type: 'film'},
            {name: 'The Justice League Part One', kinopoiskId: 424994, id: 0, type: 'film'},
            {name: 'The flash', kinopoiskId: 817506, id: 0, type: 'film'},
            {name: 'The Justice League Part One', kinopoiskId: 424994, id: 0, type: 'film'},
            {name: 'Frozen', kinopoiskId: 493208, id: 0, type: 'film'},
            {name: 'Batman v Superman: Dawn of Justice', kinopoiskId: 770631, id: 0, type: 'film'},
            {name: 'Untitled Spider-Man Reboot', kinopoiskId: 690593, id: 0, type: 'film'}
        ];
    }

    angular.module('RecentModule').directive('owlCarousel', function () {

        var linker = function (scope, element, attr) {

            var loadCarousel = function () {
                element.owlCarousel(
                    {
                        loop: false,
                        nav: false,
                        responsive: {
                            1200: {
                                items: 6
                            },
                            992: {
                                items: 4
                            },
                            768: {
                                items: 3
                            },
                            479: {
                                items: 2
                            }
                        }
                    }
                );
            };

            scope.$watchCollection(attr.owlCarousel, function () {
                loadCarousel();
            });

        };

        return {
            restrict: "A",
            link: linker
        };

    });
})();