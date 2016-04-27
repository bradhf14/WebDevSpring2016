(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, UserService) {

        $scope.$location = $location;

        this.logout = function(){

            UserService.logoutUser()
                .then(function(response){
                $rootScope.currentUser = null;
                $location.url("/home");
            }
            );
        }
    }
})();