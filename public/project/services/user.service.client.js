//useful in various parts of application, hence why we create this

(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .factory("UserService", UserService);

    function UserService() {

        var model = {
            users : [

            {   "_id": "01101",
                "email" : "a@gmail.com",
                "username":"alice",  
                "password":"alice",
                "roles": ["fan"],
                "cities" : ["BH","NYC"]

            }

        ],
            createUser: createUser,
            addCities: addCities,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers
        };

        return model;

        //TODO: userCreate needs email field
        function createUser(user,callback){

            var userCreate = {
                username: user.username,
                password: user.password,
                email: user.email,
                _id: (new Date).getTime()
            };

            model.users.push(userCreate);
            callback(userCreate);

        }

        //Adds City to user
        function addCities(user,callback){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        model.users[i].cities = user.cities;
                        callback(model.user[i].cities);
                    }
                }
            }
        }


        function findUserByUsernameAndPassword(username, password, callback){

            var noUser = true;
            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        callback(model.users[i]);
                        noUser = false;
                    }
                }
            }
            if(noUser == true) {
                callback(null);
            }
        }

        function findAllUsers(callback){

            callback(model.users);
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