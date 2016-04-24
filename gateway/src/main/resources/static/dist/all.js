/**
 * Created by Braidner on 30/01/2016.
 */
(function () {
    'use strict';

    angular.module('App', [
        'ngRoute',
        'ngAnimate',

        //Modules
        'ContentModule',
        'ControlsModule',
        'ContentCardModule',
        'ItemModule',
        'UploadModule',
        'ProfileModule',
        'RecentModule'
    ])
        .config(RouteConfig)
        .run(MonitorConfig)
        .run(AnalyticsConfig)
        .controller("NavigationCtrl", NavigationCtrl);

    MonitorConfig.$inject = ['$rootScope'];
    function MonitorConfig($rootScope) {
        $rootScope.activeTab = "/";
        $rootScope.$on('$routeChangeStart', function (event, next) {
            //TODO add monitoring
            if (next.$$route) {
                $rootScope.activeTab = next.$$route.originalPath;
            }
        });
    }

    RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
    function RouteConfig($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }

    AnalyticsConfig.$inject = ['$rootScope', '$location', '$window'];
    function AnalyticsConfig($rootScope, $location, $window) {
        $rootScope.$on('$routeChangeSuccess',
            function () {
                if (!$window.ga) {
                    return;
                }
                $window.ga('send', 'pageview', {
                    page: $location.path()
                });
            }
        );
    }

    NavigationCtrl.$inject = ['$scope'];
    function NavigationCtrl ($scope) {
        $scope.$on('$routeChangeStart', function (event, current) {
            var totalWidth = $('menu ul').width();
            $("menu ul li").each(function (index, el) {
                var width = $(el).outerWidth();
                var tab = $scope.tabs[index];
                tab.index = index;
                if (index === 0) {
                    tab.left = 0;
                    tab.right = totalWidth - width;
                } else {
                    var lastTab = $scope.tabs[index - 1];
                    tab.left = totalWidth - lastTab.right;
                    tab.right = lastTab.right - width;
                }
                if ($scope.activeTab.indexOf(tab.id) > -1) {
                    selectTab(tab);
                }
            });
        });

        $scope.tabs = [
            new Tab("/", "Все"),
            new Tab("/film", "Фильмы"),
            new Tab("/serial", "Сериалы"),
            new Tab("/anime", "Аниме"),
            new Tab("/other", "Прочее"),
            new Tab("/upload", "Загрузить фильм")
        ];
        
        $scope.selectTab = selectTab;

        function selectTab(tab) {
            var selectedTab;
            var indicator = $('.menu-indicator');
            var index = $('li.active-menu').index();

            selectedTab = $scope.tabs[tab.index];
            if (index > tab.index) {
                indicator.removeClass("right");
                indicator.addClass("left");
                indicator.css({left: selectedTab.left});
                indicator.css({right: selectedTab.right});
            } else {
                indicator.removeClass("left");
                indicator.addClass("right");
                indicator.css({right: selectedTab.right});
                indicator.css({left: selectedTab.left});
            }
        }
    }

    function Tab(id, name, selected) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }

    Tab.prototype = {
        id: "",
        name: "",
        selected: false
    };

    angular.module('App').directive('background', function(){
        return function(scope, element, attrs){
            var url = attrs.background;
            element.css({
                'background-image': 'url(' + url +')',
                'background-size' : 'cover'
            });
        };
    });



})();
/**
 * Created by goodl on 3/9/2016.
 */

(function () {
    angular.module('ContentModule', ['ContentServices'])
        .config(RouteConfig)
        .controller('AllContentCtrl', AllContentCtrl)
        .controller('SerialContentCtrl', SerialContentCtrl)
        .controller('FilmContentCtrl', FilmContentCtrl);

    function RouteConfig($routeProvider) {
        "ngInject";
        $routeProvider.when('/', {
            templateUrl: '/app/content/content.html',
            controller: 'AllContentCtrl'
        }).when('/film', {
            templateUrl: '/app/content/content.html',
            controller: 'FilmContentCtrl'
        }).when('/serial', {
            templateUrl: '/app/content/content.html',
            controller: 'SerialContentCtrl'
        });
    }

    AllContentCtrl.$inject = ['$scope', 'ContentService'];
    function AllContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent();
    }

    FilmContentCtrl.$inject = ['$scope', 'ContentService'];
    function FilmContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent(null, 'Film');
    }

    SerialContentCtrl.$inject = ['$scope', 'ContentService'];
    function SerialContentCtrl($scope, ContentService) {
        $scope.content = ContentService.findContent(null, 'Serial');
    }
})();
/**
 * Created by goodl on 3/9/2016.
 */
(function () {
    "use strict";
    angular.module('ContentServices', ['ngResource']).service('ContentService', ContentService);

    function ContentService($resource) {
        "ngInject";

        var self = this;
        var Content = $resource('/rest/content', {}, {});
        self.findContent = findContent;
        self.createContent = createContent;

        function findContent(name, type) {
            return Content.query({name: name, type: type});
        }

        function createContent(contentData) {
            var content = new Content(contentData);
            content.$save();
            return content;
        }
        
        return self;
    }
})();

/**
 * Created by goodl on 3/13/2016.
 */
(function () {
    angular.module('ContentCardModule', []);
    
    angular.module('ContentCardModule')
        .config(RouteConfig)
        .controller('FilmCardCtrl', FilmCardCtrl)
        .controller('SerialCardCtrl', SerialCardCtrl);

    function RouteConfig($routeProvider) {
        "ngInject";
        $routeProvider.when('/film/:content_id', {
            templateUrl: '/app/content-card/content-card.html',
            controller: 'FilmCardCtrl'
        }).when('/serial/:content_id', {
            templateUrl: '/app/content-card/content-card.html',
            controller: 'SerialCardCtrl'
        });
    }

    function FilmCardCtrl() {
        "ngInject";
    }

    function SerialCardCtrl() {
        "ngInject";
    }
    
})();
/**
 * Created by goodl on 4/2/2016.
 */
(function() {
    "use strict";

    angular.module('ControlsModule', [
        'control.input-control', 
        'control.parser',
        'control.input-chunk'
    ]);
})();
/**
 * Created by goodl on 3/9/2016.
 */
(function () {
    angular.module('ItemModule', [])
        .directive('contentItem', contentItem);

    contentItem.$inject = ['$location'];
    function contentItem($location) {
        "ngInject";
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

    function ProfileCtrl($scope) {
        'ngInject';
        
    }
    
})();
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
/**
 * Created by Braidner on 06/03/2016.
 */
(function () {
    'use strict';

    angular.module('UploadModule', ['ngResource']);
    angular.module('UploadModule').config(RouteConfig);
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);
    angular.module('UploadModule').factory('UploadData', UploadData);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: '/app/upload/upload.html',
            controller: 'UploadCtrl'
        });
    }
    

    UploadCtrl.$inject = ['$scope', 'UploadData'];
    function UploadCtrl($scope, UploadData) {
        var content = UploadData.get();
        console.log(content);
        UploadData.set(null);
        console.log(content);
        if (content) {
            $scope.content = content;
        }
    }

    function UploadData() {
        var uploadData = {};
        function set(data) {
            uploadData = data;
        }
        function get() {
            return uploadData;
        }

        return {
            set: set,
            get: get
        };
    }

})();
/**
 * Created by goodl on 4/2/2016.
 */


angular.module('control.input-control', [])
    .directive('lmInput', lmInput);

function lmInput() {
    return {
        scope: {
            bindModel:'=ngModel'
        },
        require: 'ngModel',
        transclude: true,
        'templateUrl': '/app/control/input/input-control.html',
        link: function (scope, elem, attr, ngModel) {
            "use strict";
            // elem.on('click', function () {
            //     elem.addClass('lm-input-focused');
            // });
        }
    };
}
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