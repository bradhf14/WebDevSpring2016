(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $location, $scope, $routeParams) {

        this.update = function(user){

            UserService
                .updateUser($rootScope.currentUser._id,user)
                .then(function(response){
                    $rootScope.currentUser = response.data;
                    $routeParams.userId = $rootScope.currentUser._id;
            });
        }
    }
})();