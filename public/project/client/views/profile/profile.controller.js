(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("ProfileController", ProfileController);

    //rootScope and location are angular services, UserService is service we created
    function ProfileController($rootScope, UserService, $location) {

        var prof = this;
        prof.addCity = addCity;
        prof.removeCity = removeCity;
        prof.cities = UserService.findAllCities();
        prof.unwatched = UserService.findAllUnwatchedCities($rootScope.currentUser);

        function addCity(user)
        {
            UserService.addCity(user, $rootScope.currentUser.username, $rootScope.currentUser.password)
                .then(function(response){

                    UserService.findUserById($rootScope.currentUser._id)
                        .then(function(response) {
                            $rootScope.currentUser = response.data[0];
                            console.log("this is hte new current user");
                            console.log( $rootScope.currentUser);
                            prof.unwatched = UserService.findAllUnwatchedCities($rootScope.currentUser);
                            $location.url("/profile");
                        });

                });

        }

        function removeCity(i){
            console.log(i);
            UserService.removeCity(i,$rootScope.currentUser.username, $rootScope.currentUser.password)
                .then(function(response){

                    UserService.findUserById($rootScope.currentUser._id)
                        .then(function(response) {
                            $rootScope.currentUser = response.data[0];
                            console.log("this is hte new current user");
                            console.log( $rootScope.currentUser);
                            prof.unwatched = UserService.findAllUnwatchedCities($rootScope.currentUser);
                            $location.url("/profile");
                        });

                });


        }

    }
})();
