(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, $rootScope) {

        //need to implement event handlers still!!!!

        $scope.$location = $location;

        var loggedIn = false;

        if($rootScope.currentUser != null){
            loggedIn = true;
        }

    }
})();