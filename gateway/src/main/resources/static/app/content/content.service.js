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
