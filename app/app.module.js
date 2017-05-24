'use strict';

angular.module('ficticiaApp', ['ui.router', 'ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'header/header.html',
                        controller: 'HeaderController'
                    },
                    'content':{
                        templateUrl : 'destaque/destaque.html',
                        controller : 'DestaqueController'
                    }
                }
            })
            .state('app.videos', {
                url:'videos',
                views: {
                    'content@': {
                        templateUrl : 'videos/videos.html',
                        controller  : 'VideosController'
                   }
                }
            })
            .state('app.search', {
                url:'search/:word',
                views: {
                    'content@': {
                        templateUrl : 'search/search.html',
                        controller  : 'SearchController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');

            // use the HTML5 History API
            $locationProvider.hashPrefix('');
    })
;