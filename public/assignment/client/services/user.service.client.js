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
            updateUser: updateUser,
            logoutUser: logoutUser,
            login: login,
            createUserAdmin: createUserAdmin,
            deleteFormByIdAdmin: deleteFormByIdAdmin,
            updateUserAdmin: updateUserAdmin
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
            return $http.get ("/api/assignment/admin/user");
        }

        function createUser(user){
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId){
            return $http.delete ("/api/assignment/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put ("/api/assignment/user/" + userId, user);
        }

        function logoutUser(){

            return $http.post("/api/assignment/logout")
        }

        function login(userin, username, password) {
            return $http.post("/api/assignment/login?username=" + username + "&password=" + password, userin);
        }

        function createUserAdmin(user){
            return $http.post("/api/assignment/admin/user", user);
        }

        function deleteFormByIdAdmin(userId){
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

        function updateUserAdmin (userId, user) {
            return $http.put ("/api/assignment/admin/user/" + userId, user);
        }
    }
})();