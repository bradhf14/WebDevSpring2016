(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {

        this.login = function(user)
        {
             UserService.login(user.Username, user.Password)
                .then(function(response) {

                    console.log(response);
                    if(response != null){

                        //Store the user in the $rootScope
                        $rootScope.currentUser = response.data[0];

                        $rootScope.danger = null;
                        //Use the $location service to navigate to profile view
                        if( $rootScope.currentUser.roles[0] == 'Fan'){
                            $location.url("/profile");
                        }else if(  $rootScope.currentUser.roles[0] == 'Admin'){
                            $location.url("/profileAdmin");
                        }else{
                            $location.url("/profileWife");
                        }
                    }
                });
        }
    }
})();