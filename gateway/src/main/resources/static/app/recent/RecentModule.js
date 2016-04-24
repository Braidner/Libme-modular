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
            {name: 'Zootopia', poster: 'http://www.kinopoisk.ru/images/film_big/775276.jpg', id: 0, type: 'film'},
            {name: 'Batman v Superman: Dawn of Justice', poster: 'http://www.kinopoisk.ru/images/film_big/770631.jpg', id: 0, type: 'film'},
            {name: 'The Justice League Part One', poster: 'http://www.kinopoisk.ru/images/film_big/424994.jpg', id: 0, type: 'film'},
            {name: 'The flash', poster: 'http://www.kinopoisk.ru/images/film_big/817506.jpg', id: 0, type: 'film'},
            {name: 'The Justice League Part One', poster: 'http://www.kinopoisk.ru/images/film_big/424994.jpg', id: 0, type: 'film'},
            {name: 'Frozen', poster: 'http://www.kinopoisk.ru/images/film_big/493208.jpg', id: 0, type: 'film'},
            {name: 'Batman v Superman: Dawn of Justice', poster: 'http://www.kinopoisk.ru/images/film_big/770631.jpg', id: 0, type: 'film'},
            {name: 'Untitled Spider-Man Reboot', poster: 'http://www.kinopoisk.ru/images/film_big/690593.jpg', id: 0, type: 'film'}
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