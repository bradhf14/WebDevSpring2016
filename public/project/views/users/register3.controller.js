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

        console.log("hello from register 3 controller");
        console.log($rootScope.currentUser.OCView);

        var rc3 = this;
        rc3.register  =   register;

        function register(user){

            console.log("user passed to status function");
            console.log(user);
            UserService
                .addCityStatus(user, $rootScope.currentUser.username, $rootScope.currentUser.password,function(response) {
                    console.log("This is the response from add status function");
                    console.log(response);
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                });
        }
    }
})();