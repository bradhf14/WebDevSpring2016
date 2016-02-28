/**
 * Created by Bradley on 2/21/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var model = this;

        model.login = login;

        function login(user)
        {
            UserService
                .login(user)
                .then(
                    function(response) {
                        console.log("Login succeeded");
                        //Store the user in the $rootScope
                        $rootScope.currentUser = response;
                        $rootScope.danger = null;
                        //Use the $location service to navigate to profile view
                        $location.url("/profile/" + response.data._id);
                    },
                    function(error) {
                        console.log("Login failed");
                        $rootScope.danger = "Unable to login";
                    }
                );
        }
    }
})();