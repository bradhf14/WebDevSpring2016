(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("Register2Controller", Register2Controller);

    //rootScope and location are angular services, UserService is service we created
    function Register2Controller($rootScope, UserService, $location) {


        var rc2 = this;
        rc2.register  =   register;

        rc2.cities = UserService.findAllCities();
        rc2.viewer = {};

        for(var i = 0; i < rc2.cities.length; i++){
            rc2.viewer[rc2.cities[i]] = false;
        }


            function register()
            {
                    UserService
                        .addCities(rc2.viewer, $rootScope.currentUser.username, $rootScope.currentUser.password,function(response) {

                                $rootScope.currentUser = response;
                                $location.url("/register3");
                        });


        }
    }
})();