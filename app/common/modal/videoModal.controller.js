'use strict';

angular
    .module('ficticiaApp')
    .controller('videoModalController', ['$scope', 'video', '$sce', '$uibModalInstance', function($scope, video, $sce, $uibModalInstance){
        
        $scope.video = video;

        $scope.trustedUrl = function(videoId){
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+videoId);
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.closeModalEsc = function(event){
            if(event.wich == 16){
                $scope.closeModal();
            }
        }

    }]);
