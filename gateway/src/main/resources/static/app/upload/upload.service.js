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
});