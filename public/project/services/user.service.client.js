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
                "cities": [{
                    city: "NYC",
                    View: true,
                    Season: 8,
                    Episode: 1
                }, {
                    city: "BH",
                    View: true,
                    Season: 3,
                    Episode: 5
                }],
            }

        ],
            city: ["OC", "NYC", "NJ", "ATL", "BH"],
            createUser: createUser,
            addCities: addCities,
            addCityStatus: addCityStatus,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers
        };

        return model;

        function createUser(user,callback){

            var userCreate = {
                username: user.username,
                password: user.password,
                email: user.email,
                _id: (new Date).getTime(),
                roles: "Fan",
                cities:[]
            };

            model.users.push(userCreate);
            callback(userCreate);

        }

        //Adds City to user
        function addCities(user, username, password, callback){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        //TODO make this 5 dynamic for number of cities/franchises
                        for(var j = 0; j<5; j++){
                            var cityToAdd = {
                                city: this.city[j],
                                View: user.city[j],
                                Season: 0,
                                Episode: 0
                            };
                            model.users[i].cities.push(cityToAdd);
                        }
                        callback(model.users[i]);
                    }
                }
            }
        }

        function addCityStatus(user, username, password, callback){
            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        //TODO make this 5 dynamic for number of cities/franchises
                        for(var j = 0; j<5; j++){
                            model.users[i].cities[j].Season = user.Season[j];
                            model.users[i].cities[j].Episode = user.Episode[j];
                        }
                        callback(model.users[i]);
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