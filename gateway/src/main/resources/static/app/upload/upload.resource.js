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