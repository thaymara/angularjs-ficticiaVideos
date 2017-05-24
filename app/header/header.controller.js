'use strict';

angular
    .module('ficticiaApp')
    .controller('HeaderController', ['$scope', '$location', function($scope, $location){
        var jq = $.noConflict();
        $scope.popoverIsOpen = false;
        $scope.isNavCollapsed = true;

        $scope.doSearch = function(){
            $location.path("search/" + $scope.search.word)
        }

        $scope.openInput = function(){
            jq("#search").toggle("slow"); 
            jq(".btn-search").toggleClass("btn-search-active");
        }

        $scope.menuPopover = {
            content: 'Hello, World!',
            templateUrl: './common/menu/menu.html',
            title: 'Title'
        };

        $scope.showPopover = function(){
            $scope.popoverIsOpen = !$scope.popoverIsOpen;
        }

        $scope.closeMenu = function(){
            $scope.isNavCollapsed = !$scope.isNavCollapsed;
        }
    }]);