'use strict';

angular
    .module('ficticiaApp')
    .controller('DestaqueController', ['$scope', 'VideosService', '$sce', function($scope, VideosService, $sce){
        $scope.destaqueVideo = [];
        $scope.videos = [];

        $scope.message = "";
        $scope.showDestaqueVideo = true;
        $scope.showVideos = true;
        $scope.maxResults = 10;

        $scope.loading = false;
        $scope.nextPage = null;
        $scope.listEmpty = false;

        $scope.fullDescription = false;
        
        VideosService.getVideos($scope.maxResults, "")
        .then(function(response){
                var resp = response.data;
                $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : null;
                $scope.getVideosDetail(resp.items, true);
            },
            function(error){
                $scope.showDestaqueVideo = false;
                $scope.showVideos = false;
                $scope.message = "Error "  + error.status + " " + error.statusText;
            }
        );

        $scope.loadMoreVideos = function(){
            $scope.loading = true;
            VideosService.getVideos($scope.maxResults, $scope.nextPage)
            .then(function(response){
                    var resp = response.data;
                    $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : null;
                    if(resp.items.length > 0){
                        $scope.getVideosDetail(resp.items);
                    }else{
                        $scope.loading = false;
                        $scope.listEmpty = true;
                    }
                },
                function(error){
                    $scope.showDestaqueVideo = false;
                    $scope.showVideos = false;
                    $scope.message = "Error "  + error.status + " " + error.statusText;
                }
            );
        }
        
        $scope.getVideosDetail = function(videos, loadDestaque){
            angular.forEach(videos, function(video, key) {
                    VideosService.getVideoDetail(video.id.videoId)
                    .then(function(response){
                        if(key===0 && loadDestaque){
                            $scope.destaqueVideo = response.data.items[0];
                        }
                        $scope.videos.push(response.data.items[0]);
                        $scope.loading = false;
                    },
                    function(error){
                        $scope.showDestaqueVideo = false;
                        $scope.showVideos = false;
                        $scope.message = "Error "  + error.status + " " + error.statusText;
                    })
                });
        }

        $scope.openVideo = function(videoArray){
            $scope.destaqueVideo = videoArray;
        }

        $scope.trustedUrl = function(videoId){
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+videoId);
        }

        $scope.openFullDescription = function(){
            $scope.fullDescription = !$scope.fullDescription;
        }
}]);