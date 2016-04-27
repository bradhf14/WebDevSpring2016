(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location, $scope) {

        this.login = login

        function login(user)
        {
            if(user) {
                UserService
                    .login(user, user.Username, user.Password)
                    .then(function (response) {
                        //TODO This null might be redundant, look into promises

                        if (response.data[0] != null) {
                            //Store the user in the $rootScope
                            $rootScope.currentUser = response.data[0];
                            $rootScope.danger = null;
                            //Use the $location service to navigate to profile view
                            $location.url("/profile/"+  response.data[0].username );
                            //$location.url("/profile/" + response.data._id);
                        } else {
                            $scope.message = "Login failed"
                        }

                    })
            }
        }
    }
})();