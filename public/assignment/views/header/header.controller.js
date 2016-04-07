/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope) {

        $scope.$location = $location;

        this.logout = function(){

            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();