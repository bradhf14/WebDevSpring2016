(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("AdminProfileController", AdminProfileController);

    //rootScope and location are angular services, UserService is service we created
    function AdminProfileController($rootScope, UserService, $location) {

        var prof = this;
        prof.unverified = UserService.getUnverified();
        prof.approve = approve;
        prof.deny = deny;

        function approve(i){

            var approvedWife = prof.unverified[i];
            UserService.verify(approvedWife);
            prof.unverified = UserService.getUnverified();
        }

        function deny(i){
            var deniedWife = prof.unverified[i];
            UserService.deny(deniedWife);
            prof.unverified = UserService.getUnverified();
        }
    }
})();
