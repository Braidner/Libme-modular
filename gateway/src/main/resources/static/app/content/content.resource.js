(function () {
    'use strict';
    angular.module('ContentModule').factory('ContentResource', ContentResource);

    ContentResource.$inject = ['$resource'];
    function ContentResource($resource) {
        return $resource('api/content/{id}');
    }
})();