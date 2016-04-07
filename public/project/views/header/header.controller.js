/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        //need to implement event handlers still!!!!
        console.log($location);
        $scope.$location = $location;
    }
})();