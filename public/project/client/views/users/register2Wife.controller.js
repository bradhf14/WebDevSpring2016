/**
 * Created by Bradley on 4/10/16.
 */
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("RegisterWifeController", RegisterWifeController);

    //rootScope and location are angular services, UserService is service we created
    function RegisterWifeController($rootScope, UserService, $location) {

        var rc2w = this;
        rc2w.register  =   register;
        rc2w.cities = UserService.findAllCities();

        function register(user) {


            console.log(user);
            UserService.addCityHousewife(user,$rootScope.currentUser.username, $rootScope.currentUser.password)
                .then(function(response){

                    UserService.findUserById($rootScope.currentUser._id)
                        .then(function(response) {

                            $rootScope.currentUser = response.data[0];
                            console.log($rootScope.currentUser);
                            $location.url("/profileWife");
                        });
            });

        }
    }
})();