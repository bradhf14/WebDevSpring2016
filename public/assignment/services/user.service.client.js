(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var users = [

            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
         ];


        function findUserByUsernameAndPassword(username, password, callback){
            for (i = 0; i < users.length; i++){
                if(users[i].username == username){
                    if(users[i].password == password){
                        callback = "user found"
                    }else callback = null;
                }else callback = null;
            }

            return callback;
        }

        function findAllUsers(callback){

        }

        function createUser(user, callback){

        }

        function deleteUserById(userid, callback){

        }

        function updateUser(userId, user, callback){

        }





        //Not sure if we are using this
        var service = {
            login: login
        };
        return service;

        function login(username, password) {
            var deferred = $q.defer();

            var credentials = {
                username: username,
                password: password
            };

            $http.post("/api/example/express/movies/login", credentials)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();