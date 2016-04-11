(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("Register2Controller", Register2Controller);

    //rootScope and location are angular services, UserService is service we created
    function Register2Controller($rootScope, UserService, $location) {


        console.log("this is currently the user in rootscope");
        console.log($rootScope.currentUser);

        var rc2 = this;
        rc2.register  =   register;

        rc2.cities = UserService.findAllCities();
        rc2.viewer = {};

        for(var i = 0; i < rc2.cities.length; i++){
            rc2.viewer[rc2.cities[i]] = false;
        }


            function register()
            {
                console.log("This is waht is now passed in with ng repeat");
                console.log(rc2.cities);
                console.log(rc2.viewer);

                    UserService
                        .addCities(rc2.viewer, $rootScope.currentUser.username, $rootScope.currentUser.password,function(response) {
                                console.log("This is the response from add cities function");
                                console.log(response);
                                $rootScope.currentUser = response;
                                $location.url("/register3");
                        });


        }
    }
})();