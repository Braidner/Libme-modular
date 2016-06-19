/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['UploadData', 'UploadService'];
    function UploadCtrl(UploadData, UploadService) {
        var self = this;
        var content = UploadData.get();
        UploadData.set(null);
        if (content) {
            self.content = content;
        }

        self.createContent = UploadService.createContent;
    }
})();