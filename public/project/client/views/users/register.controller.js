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

        var rc1 = this;
        rc1.register  =   register;

        //TODO This might have to change completely, add housewives radial button

        function register(user) {

                if (user.password != user.password2 || !user.password || !user.password2) {
                    $rootScope.danger = "Your passwords don't match";
                }
                else {

                    if (user.housewifeStatus) {

                        user.roles = ['Housewife'];
                        UserService
                            .createUser(user)
                            .then(function (response) {

                                console.log("this is what is returned");
                                console.log(response.data);

                                if (response != null) {   //store the new user object in the rootScope
                                    $rootScope.currentUser = response.data;
                                    $location.url("/register2Wife");
                                }
                                else {
                                    $rootScope.danger = "Unable to register";
                                }
                            });

                    } else {

                    UserService
                        .createUser(user)
                        .then(function (response) {

                            console.log("this is what is returned");
                            console.log(response.data);

                            if (response != null) {   //store the new user object in the rootScope
                                $rootScope.currentUser = response.data;
                                $location.url("/register2");
                            }
                            else {
                                $rootScope.danger = "Unable to register";
                            }
                        });
                }
            }
        }
    }
})();