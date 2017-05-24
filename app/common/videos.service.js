'use strict';

angular
    .module('ficticiaApp')
    .service('VideosService', 
        ['BASEURL',
            'CHANNELID',
            'APIKEY',
            '$http',
        function(BASEURL, CHANNELID, APIKEY, $http){
            this.getVideos = function(maxResults, pageToken){
                return $http.get(
                    BASEURL.URL + "search?" +
                        "part=snippet&channelId=" + CHANNELID.CHANNELID +
                        "&key=" + APIKEY.KEY +
                        "&maxResults=" + maxResults + "&order=date" +
                        "&pageToken=" + pageToken
                )
            };

            this.getVideoDetail = function(videoId){
                return $http.get(
                    BASEURL.URL + "videos?" +
                    "&id=" + videoId +
                    "&key=" + APIKEY.KEY +
                    "&part=snippet,contentDetails,statistics"
                )
            };

            this.searchVideo = function(pesquisa, maxResults, pageToken){
                return $http.get(
                    BASEURL.URL + "search?" +
                    "part=snippet&channelId="  + CHANNELID.CHANNELID +
                    "&key=" + APIKEY.KEY +
                    "&maxResults=" + maxResults + "&order=date" +
                    "&q=" + pesquisa + "&pageToken=" + pageToken
                )
            }
}]);