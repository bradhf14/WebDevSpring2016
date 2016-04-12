(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("WifeProfileController", WifeProfileController);

    //rootScope and location are angular services, UserService is service we created
    function WifeProfileController($rootScope, UserService, $location) {

        var prof = this;
        prof.name = $rootScope.currentUser.name;

    }
})();
