(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var model = {
            users : [

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
        ],
            createUser: createUser,
            updateUser: updateUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword


            //findUserByCredentials: findUserByCredentials,

           // setCurrentUser: setCurrentUser,
           // getCurrentUser: getCurrentUser
        };

        return model;

        //var;


        function findUserByUsernameAndPassword(username, password, callback){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        callback(model.users[i]);
                    }
                }
            }

            callback(null);
        }

        function findAllUsers(callback){

            callback(model.users);
        }


        //TODO: userCreate needs email field
        function createUser(user,callback){

            var userCreate = {
                username: user.username,
                password: user.password,
                _id: (new Date).getTime()

            };

            model.users.push(userCreate);
            callback(userCreate);

        }

        //TODO: Check logic
        function deleteUserById(userId, callback){
            for (i = 0; i < model.users.length; i++){
                if(model.users[i]._id == userId){
                    model.users.splice(i,1);
                }
            }
            callback(model.users);
        }

        function updateUser(userId, user, callback){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i]._id == userId){
                    model.users[i].firstName = user.firstName;
                    model.users[i].lastName = user.lastName;
                    model.users[i].username = user.username;
                    model.users[i].password = user.password;
                    model.users[i].roles = user.roles;
                    callback(model.users[i]);
                }
            }

        }


    }
})();