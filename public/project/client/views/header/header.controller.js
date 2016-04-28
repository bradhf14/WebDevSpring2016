/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {
        //need to implement event handlers still!!!!
        $scope.$location = $location;

        var head = this;
        head.logout = logout;

        function logout(){
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();