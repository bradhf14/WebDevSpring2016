/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    //rootScope and location are angular services, UserService is service we created
    function RegisterController($rootScope, UserService, $location) {

        this.register = function(user)
        {
            //console.log(user.username);
            //console.log(user.password);
            //console.log(user.email);

            if(user.password != user.password2 || !user.password || !user.password2)
            {
                $rootScope.danger = "Your passwords don't match";
            }
            else
            {
                UserService
                    .createUser(user,function(response) {
                        if(response != null)
                        {
                            console.log("the current user from register");
                            console.log(response)
                            //store the new user object in the rootScope
                            $rootScope.currentUser = response;
                            $location.url("/profile");
                            //Use the $location service to navigate to the profile view
                            //may use this new location in the future
                            //$location.url("/profile/" + response._id);
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