(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("WifeProfileController", WifeProfileController);

    //rootScope and location are angular services, UserService is service we created
    function WifeProfileController($rootScope, UserService, $location) {


        console.log("this is currently the housewife in profile");
        console.log($rootScope.currentUser);

        var prof = this;

    }
})();
