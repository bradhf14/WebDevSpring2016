/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    //rootScope and location are angular services, UserService is service we created
    function RegisterController($scope, $rootScope, UserService, $location) {

        this.register = register;

        function register(user)
        {
            if( user == null || !user.username || !user.password || !user.password2 || !user.email )
            {
                $rootScope.danger = "User left a field blank";
                return;
            } else if (user.password != user.password2){

                $rootScope.danger = "Users passwords don't match";
                return;
            } else {

                UserService
                    .createUser(user)
                    .then(function(response){


                        if(response.data != null)
                        {
                            //store the new user object in the rootScope
                            $rootScope.currentUser = response.data;
                            $location.url("/profile/"+user.username);
                            //Use the $location service to navigate to the profile view
                            //may use this new location in the future, not sure yet
                            //$location.url("/profile/" + response._id);
                        }
                        else
                        {
                            $rootScope.danger = "Unable to register";
                        }
                    }, function(response){
                        $rootScope.danger = "Unable to register";
                    });
            }
        }
    }
})();