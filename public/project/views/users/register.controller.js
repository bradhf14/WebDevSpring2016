/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("RegisterController", RegisterController);

    //rootScope and location are angular services, UserService is service we created
    function RegisterController($rootScope, UserService, $location) {


    //TODO This might have to change completely, add housewives radial button
        this.register = function(user)
        {
            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $rootScope.danger = "Your passwords don't match";
            }
            else
            {
                UserService
                    .createUser(user,function(response) {
                        if(response != null)
                        {   //store the new user object in the rootScope
                            $rootScope.currentUser = response;
                            $location.url("/register2");
                        }
                        else
                        {
                            $rootScope.danger = "Unable to register";
                        }
                    });
            }
        }
    }
})();