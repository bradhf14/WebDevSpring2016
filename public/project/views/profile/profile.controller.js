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
            prof.unwatched = UserService.findAllUnwatchedCities($rootScope.currentUser);
        }

        function removeCity(i){
            UserService.removeCity(i,$rootScope.currentUser.username, $rootScope.currentUser.password);
            prof.unwatched = UserService.findAllUnwatchedCities($rootScope.currentUser);
        }

    }
})();
