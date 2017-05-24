'use strict';

angular
    .module('ficticiaApp')
    .controller('VideosController', ['$scope', 'VideosService', '$uibModal', '$document', function($scope, VideosService, $uibModal, $document){
        $scope.videos = [];

        $scope.message = "";
        $scope.showVideos = true;
        $scope.maxResults = 12;

        $scope.loading = false;
        $scope.nextPage = null;

        VideosService.getVideos($scope.maxResults, "")
        .then(function(response){
                var resp = response.data;
                $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : null;
                $scope.getVideosDetail(resp.items);
            },
            function(error){
                $scope.showVideos = false;
                console.log(error);
                $scope.message = "Error "  + error.status + " " + error.statusText;
            }
        );

        $scope.loadMoreVideos = function(){
            $scope.loading = true;
            VideosService.getVideos($scope.maxResults, $scope.nextPage)
            .then(function(response){
                    var resp = response.data;
                    $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : null;
                    $scope.getVideosDetail(resp.items);
                },
                function(error){
                    $scope.showVideos = false;
                    $scope.message = "Error "  + error.status + " " + error.statusText;
                }
            );
        }
        
        $scope.getVideosDetail = function(videos){
            angular.forEach(videos, function(video, key) {
                    VideosService.getVideoDetail(video.id.videoId)
                    .then(function(response){
                        $scope.videos.push(response.data.items[0]);
                        $scope.loading = false;
                    },
                    function(error){
                        $scope.showVideos = false;
                        $scope.message = "Error "  + error.status + " " + error.statusText;
                    })
                });
        }

        $scope.openModalVideo = function(video, size, parentSelector){
            console.log(video);
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                backdrop: false,
                templateUrl: './common/modal/videoModal.html',
                controller: 'videoModalController',
                size: size,
                appendTo: parentElem,
                resolve:{
                    video: function(){
                        return video;
                    }
                }
            });
        }
}]);