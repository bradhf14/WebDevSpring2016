(function(){
    "use strict";
    angular
        .module("HousewivesApp")
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
                        if(response.roles[0] == 'Fan'){
                            $location.url("/profile");
                        }else if( response.roles[0] == 'Admin'){
                            $location.url("/profileAdmin");
                        }else{
                            $location.url("/profileWife");
                        }
                    }
                });
        }
    }
})();