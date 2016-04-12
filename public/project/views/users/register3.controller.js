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

        function register(){

            UserService
                .addCityStatus(rc3.Season, rc3.Episode, $rootScope.currentUser.username, $rootScope.currentUser.password,function(response) {
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                });
        }
    }
})();