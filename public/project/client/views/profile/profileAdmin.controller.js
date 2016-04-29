(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .controller("AdminProfileController", AdminProfileController);

    //rootScope and location are angular services, UserService is service we created
    function AdminProfileController($rootScope, UserService, $location) {

        var prof = this;
        UserService.getUnverified()
            .then(function(response){
                prof.unverified = response.data;
            });

        prof.approve = approve;
        prof.deny = deny;

        function approve(i){

            var approvedWife = prof.unverified[i];
            UserService.verify(approvedWife)
                .then(function(response){
                    UserService.getUnverified()
                        .then(function(response){
                            prof.unverified = response.data;
                        });
                });

        }

        function deny(i){
            var deniedWife = prof.unverified[i];
            UserService.deny(deniedWife).then(function(response){
                UserService.getUnverified()
                    .then(function(response){
                        prof.unverified = response.data;
                    });
            });
        }
    }
})();
