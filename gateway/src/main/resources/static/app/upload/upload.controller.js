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