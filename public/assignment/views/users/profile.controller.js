/**
 * Created by Bradley on 2/21/16.
 */

(function(){
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