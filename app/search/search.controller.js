'use strict';

angular
    .module('ficticiaApp')
    .controller('SearchController', ['$scope', 'VideosService', '$stateParams', '$uibModal', '$document', function($scope, VideosService, $stateParams, $uibModal, $document){
        
        $scope.research = $stateParams.word;

        $scope.resultList = [];

        $scope.message = "";
        $scope.showVideos = true;
        $scope.maxResults = 12;

        $scope.loading = false;
        $scope.nextPage = '';
        $scope.listEmpty = false;

        VideosService.searchVideo($stateParams.word, $scope.maxResults, "")
        .then(function(response){
                var resp = response.data.items;
                $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : ''
                //console.log(response.data.nextPageToken);
                if(response.data.items.length > 0){
                    $scope.getVideosDetail(resp);
                }else{
                    $scope.listEmpty = true;
                    $scope.resultList = [];
                }
            },
            function(error){
                console.log(error);
                $scope.showVideos = false;
                $scope.message = "Error "  + error.status + " " + error.statusText;
            }
        );

        $scope.loadMoreVideos = function(){
            $scope.loading = true;
            VideosService.searchVideo($stateParams.word, $scope.maxResults, $scope.nextPage)
            .then(function(response){
                    var resp = response.data;
                    $scope.nextPage = response.data.nextPageToken ? response.data.nextPageToken : null;
                    if(resp.items.length > 0){
                        $scope.getVideosDetail(resp.items);
                    }else{
                        $scope.loading = false;
                        $scope.nextPage = null;
                    }
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
                        $scope.resultList.push(response.data.items[0]);
                        $scope.loading = false;
                    },
                    function(error){
                       // console.log(error);
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