(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("Register2Controller", Register2Controller);

    //rootScope and location are angular services, UserService is service we created
    function Register2Controller($rootScope, UserService, $location) {






            this.register = function(user)
            {
                    UserService
                        .addCities(user,function(response) {
                                $rootScope.currentUser = response;
                                $location.url("/register2");
                        });



            //Use the $location service to navigate to the profile view

            //may use this new location in the future, not sure yet
            //$location.url("/profile/" + response._id);
        }
    }
})();