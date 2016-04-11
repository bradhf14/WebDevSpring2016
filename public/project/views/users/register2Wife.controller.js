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

        console.log("Register Wife Controller has been called")

        var rc2w = this;
        rc2w.register  =   register;
        rc2w.cities = UserService.findAllCities();



        //TODO This might have to change completely, add housewives radial button

        function register(user) {

            UserService.addCityHousewife(user,$rootScope.currentUser.username, $rootScope.currentUser.password, function(response){
                $rootScope = response;
                console.log($rootScope);
            });


        }
    }
})();