(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {

        this.login = function(user)
        {

            UserService
                .findUserByUsernameAndPassword(user.Username, user.Password, function(response) {

                    if(response != null){

                        //Store the user in the $rootScope
                        $rootScope.currentUser = response;

                        $rootScope.danger = null;
                        //Use the $location service to navigate to profile view
                        $location.url("/profile");
                        //$location.url("/profile/" + response.data._id);
                        //
                    }
                });
        }
    }
})();