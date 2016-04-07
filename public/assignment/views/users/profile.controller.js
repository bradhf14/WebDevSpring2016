(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        this.update = function(user){
            UserService.updateUser($rootScope.currentUser._id,user,function(response){

                console.log(response);
            });
        }
    }
})();