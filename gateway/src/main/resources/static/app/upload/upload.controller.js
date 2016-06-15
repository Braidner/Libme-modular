/**
 * Created by User on 15.06.2016.
 */
(function () {
    'use strict';
    angular.module('UploadModule').controller('UploadCtrl', UploadCtrl);

    UploadCtrl.$inject = ['$scope', 'UploadData', 'UploadService'];
    function UploadCtrl($scope, UploadData, UploadService) {
        var self = this;
        var content = UploadData.get();
        UploadData.set(null);
        if (content) {
            $scope.content = content;
        }

        self.createContent = UploadService.createContent;
    }
});