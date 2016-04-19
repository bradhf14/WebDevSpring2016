(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location, $scope) {

        this.login = login

        console.log("login controller")
        function login(user)
        {
            console.log("login controller login function called")

            if(user != null) {
                UserService
                    .findUserByCredentials(user.Username, user.Password)
                    .then(function (response) {
                        //TODO This null might be redundant, look into promises

                        if (response.data != null) {
                            //Store the user in the $rootScope
                            $rootScope.currentUser = response.data;
                            $rootScope.danger = null;
                            console.log("end current user");
                            console.log(response.data);
                            //Use the $location service to navigate to profile view
                            $location.url("/profile");
                            //$location.url("/profile/" + response.data._id);
                        } else {
                            $scope.message = "Login failed"
                        }

                    })
            }else{
                $scope.message = "Please enter a username and password"
            }


        }
    }
})();