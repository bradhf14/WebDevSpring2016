(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("ProfileController", ProfileController);

    //rootScope and location are angular services, UserService is service we created
    function ProfileController($rootScope, UserService, $location) {


        console.log("this is currently the user in profile");
        console.log($rootScope.currentUser);

        var prof = this;
    }
})();
