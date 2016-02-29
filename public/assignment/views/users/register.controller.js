/**
 * Created by Bradley on 2/21/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location) {
        console.log("Hello from register controller");
        //var model = this;
        //
        //model.register = register;
        //
        //function register (user)
        //{
        //    if(user.password != user.password2 || !user.password || !user.password2)
        //    {
        //        $rootScope.danger = "Your passwords don't match";
        //    }
        //    else
        //    {
        //        UserService
        //            .register(user)
        //            .then(function(response) {
        //                if(response != null)
        //                {
        //                    //store the new user object in the rootScope
        //                    $rootScope.currentUser = response;
        //                    //Use the $location service to navigate to the profile view
        //                    $location.url("/profile/" + response.data._id);
        //                }
        //                else
        //                {
        //                    $rootScope.danger = "Unable to register";
        //                }
        //            });
        //    }
        //}
    }
})();