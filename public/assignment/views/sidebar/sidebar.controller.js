/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope) {

        //need to implement event handlers still!!!!

        //console.log($location);
        $scope.$location = $location;
        //console.log($rootScope);
        //console.log($location);
        //console.log($scope);



        //On login, check if no one is logged in.  If not, show registration in header

        //Highlight menu to reflect current location
    }
})();