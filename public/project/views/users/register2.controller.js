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



            function register(user)
            {
                    UserService
                        .addCities(user, $rootScope.currentUser.username, $rootScope.currentUser.password,function(response) {
                                console.log("This is the response from add cities function");
                                console.log(response);
                                $rootScope.currentUser = response;
                                $location.url("/register3");
                        });


        }
    }
})();