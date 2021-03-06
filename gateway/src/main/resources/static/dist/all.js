/**
 * Created by Braidner on 30/01/2016.
 */
(function () {
    'use strict';

    angular.module('App', [
        'ngRoute',
        'ngAnimate',

        //Modules
        'app.auth',
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
        $scope.$on('$routeChangeSuccess', function (event, current) {
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
(function () {
    'use strict';
    
    angular.module('app.auth', ['ngRoute', 'ngResource', 'ngCookies', 'ControlsModule']);
})();
/**
 * Created by goodl on 3/9/2016.
 */

(function () {
    angular.module('ContentModule', ['ContentServices'])
        .controller('AllContentCtrl', AllContentCtrl)
        .controller('SerialContentCtrl', SerialContentCtrl)
        .controller('FilmContentCtrl', FilmContentCtrl);

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
 * Created by User on 15.06.2016.
 */
angular.module('UploadModule', ['ngResource', 'ngFileUpload', 'ngCookies']);

(function () {
    'use strict';
    angular.module('app.auth').controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', "$location", '$scope'];
    function LoginController(AuthService, $location, $scope) {
        var self = this;
        self.email = 'Braidner';
        self.password = '12345';

        self.auth = auth;

        $scope.$on('oauth:login', function (token) {
            console.log(AuthService.isAuthenticated);
            if (AuthService.isAuthenticated) {
                $location.path('/');
            }
        });

        function auth(login, password) {
            AuthService.login(login, password);
        }
    }
})();
(function () {
    'use strict';

    angular.module('app.auth')
        .run(RouteInterceptor)
        .config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/app/auth/login.html'
        });
    }

    RouteInterceptor.$inject = ['$rootScope', '$location', 'AuthService'];
    function RouteInterceptor($rootScope, $location, AuthService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //jshint debug: true
            debugger;
            console.log(AuthService.isAuthenticated + ' : ' + next.$$route.originalPath);
            if (!AuthService.isAuthenticated && next.$$route.originalPath != '/login') {

                event.preventDefault();

                console.log('need auth');
                $location.path('/login');
            }
        });
    }
})();
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
(function () {
    'use strict';
    angular.module('ContentModule').factory('ContentResource', ContentResource);

    ContentResource.$inject = ['$resource'];
    function ContentResource($resource) {
        return $resource('api/content/{id}');
    }
})();
(function () {
    angular.module('ContentModule').config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
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
})();
/**
 * Created by goodl on 3/9/2016.
 */
(function () {
    "use strict";
    angular.module('ContentServices', ['ngResource'])
        .factory('ContentService', ContentService);

    ContentService.$inject = ['$resource'];
    function ContentService($resource) {
        var self = this;
        var Content = $resource('/api/content/resource', {}, {});
        self.findContent = findContent;
        self.createContent = createContent;

        function findContent(name, type) {
            return Content.query({name: name, type: type});
        }

        function createContent(contentData) {
            contentData.type = 'film';
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

    function ProfileCtrl() {
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
/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['UploadData', 'ContentService', 'Upload', '$cookies'];
    function UploadCtrl(UploadData, ContentService, Upload) {
        var self = this;
        self.uploadFile = {};
        self.content = {};
        self.save = save;
        var content = UploadData.get();
        UploadData.set(null);
        if (content) {
            self.content = content;
        }

        function save() {
            //jshint debug: true
            debugger;
            console.log(self.content);
            self.content.type = 'film';

            self.uploadFile.upload = Upload.upload({
                url: '/api/content/resource',
                data: {content: JSON.stringify(content), file: self.uploadFile}
            });

            self.uploadFile.upload.then(function (response) {
                self.uploadFile.result = response.data;
            }, function (response) {
                if (response.status > 0)
                    console.log(response.status + ': ' + response.data);
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                self.uploadFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log('Progress: ' + Math.min(100, parseInt(100.0 * evt.loaded / evt.total)));
            });
            // ContentService.createContent(self.content);
        }
    }
})();
(function () {
    'use strict';
    
    angular.module('UploadModule')
        .factory('UploadData', UploadData);

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
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').config(RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: '/app/upload/upload.html'
        });
    }
    
})();
/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').service('UploadService', UploadService);

    UploadService.$inject = ['UploadData', 'ContentResource'];
    function UploadService(uploadData, ContentResource) {
        var self = this;

        self.createContent = createContent;

        function createContent() {
            var content = uploadData.get();
            var createdContent = new ContentResource(content);
            return createdContent.id;
        }

        return self;
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