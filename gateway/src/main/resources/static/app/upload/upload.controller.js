/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['UploadData', 'ContentService'];
    function UploadCtrl(UploadData, ContentService) {
        var self = this;
        self.save = save;
        var content = UploadData.get();
        UploadData.set(null);
        if (content) {
            self.content = content;
        }

        function save() {
            console.log(self.content);
            ContentService.createContent(self.content);
        }
    }
})();