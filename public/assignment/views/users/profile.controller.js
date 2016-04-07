/**
 * Created by Bradley on 2/21/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        console.log("Hello from Profile Controller");
        console.log($rootScope.currentUser);

        var currentUser = $rootScope;

        this.update = function(user){
        //TODO Change the userid from 123 to pull from rootscope
            console.log("update function called")
            UserService.updateUser(123,user,function(response){

                console.log(response);
            });
        }


    }
})();