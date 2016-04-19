//useful in various parts of application, hence why we create this

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var model = {

            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        //Eliminate all callback in refactoring process
        return model;

        function findUserByCredentials(username, password){
            return $http.get ("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get ("/api/assignment/user?username=" + username);
        }

        function findAllUsers(){
            console.log("find all users in client services");
            return $http.get ("/api/assignment/user");
        }

        function createUser(user){
            console.log("we are about to leave client passing it this user");
            console.log(user);
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            console.log("you are movoing on with the following user id and user value to the id lookup thing")
            console.log(userId);
            console.log(user);
            return $http.put ("/api/assignment/user/" + userId, user);
        }
    }
})();