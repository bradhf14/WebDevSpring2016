/**
 * Created by Bradley on 2/21/16.
 */

//possibly use ng-show for tabs
// ng-show="tab===1", display this one, put this in html div's
(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("Register3Controller", Register3Controller);

    function Register3Controller(UserService, $rootScope, $location) {


        var rc3 = this;
        rc3.register  =   register;
        rc3.cities = UserService.findAllCities();
        rc3.Episode = {};
        rc3.Season = {};

        for(var i = 0; i < rc3.cities.length; i++){
            rc3.Episode[rc3.cities[i]] = 0;
            rc3.Season[rc3.cities[i]] = 0;
        }

        console.log("from register 3 controller");
        console.log(rc3.cities);
        console.log($rootScope.currentUser);

        function register(){

            var status = {
                Season: rc3.Season,
                Episode: rc3.Episode
            };

            UserService
                .addCityStatus(status, $rootScope.currentUser.username, $rootScope.currentUser.password)
                .then(function(response) {

                    UserService.findUserById($rootScope.currentUser._id)
                        .then(function(response) {
                            $rootScope.currentUser = response.data[0];
                            $location.url("/profile");
                        });

                });
        }
    }
})();