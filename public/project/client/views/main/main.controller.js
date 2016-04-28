
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("MainController", MainController);
    //Controller name, and function MainController

    function MainController($scope, $location) {
        $scope.$location = $location;

        //this.something, use this to refer to this controller
    }
})();