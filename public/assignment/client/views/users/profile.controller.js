(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $location, $scope) {

        this.update = function(user){

            console.log("you are updating this user");
            console.log(user);
            UserService
                .updateUser($rootScope.currentUser._id,user)
                .then(function(response){
                    $rootscope.currentUser = response.data;
            });
        }
    }
})();