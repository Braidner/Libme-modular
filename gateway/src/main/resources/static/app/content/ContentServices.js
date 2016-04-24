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
