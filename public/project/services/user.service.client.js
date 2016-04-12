//useful in various parts of application, hence why we create this

(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .factory("UserService", UserService);

    function UserService() {

        var model = {
            users : [

            {   "_id": "1234",
                "email" : "KenyaMoore@gmail.com",
                "verified": true,
                "name": "Kenya Moore",
                "username":"Keyonce",  
                "password":"shade",
                "roles": ["Housewife"],
                "city": "The Real Housewives of Atlanta"
            },

                {   "_id": "01101",
                    "email" : "a@gmail.com",
                    "username":"alice",
                    "password":"alice",
                    "roles": ["Fan"],
                    "cities": [{
                        city: "The Real Housewives of Orange County",
                        View: true,
                        Season: 8,
                        Episode: 1
                    },{
                        city: "The Real Housewives of New York City",
                        View: true,
                        Season: 4,
                        Episode: 4
                    },{
                        city: "The Real Housewives of New Jersey",
                        View: false,
                        Season: 0,
                        Episode: 0
                    },{
                        city: "The Real Housewives of Atlanta",
                        View: false,
                        Season: 0,
                        Episode: 0
                    }, {
                        city: "The Real Housewives of Beverly Hills",
                        View: false,
                        Season: 0,
                        Episode: 0
                    }]
                },

                {   "_id": "12345",
                    "email" : "AC@gmail.com",
                    "name": "Andy Cohen",
                    "username":"Andy",
                    "password":"Wacha",
                    "roles": ["Admin"]
                },

                {   "_id": "01101",
                    "email" : "a@gmail.com",
                    "username":"alice",
                    "password":"alice",
                    "roles": ["Fan"],
                    "cities": [{
                        city: "The Real Housewives of Orange County",
                        View: true,
                        Season: 8,
                        Episode: 1
                    },{
                        city: "The Real Housewives of New York City",
                        View: true,
                        Season: 4,
                        Episode: 4
                    },{
                        city: "The Real Housewives of New Jersey",
                        View: false,
                        Season: 0,
                        Episode: 0
                    },{
                        city: "The Real Housewives of Atlanta",
                        View: false,
                        Season: 0,
                        Episode: 0
                    }, {
                        city: "The Real Housewives of Beverly Hills",
                        View: false,
                        Season: 0,
                        Episode: 0
                    }]
                }

        ],
            city: [
                "The Real Housewives of Orange County",
                "The Real Housewives of New York City",
                "The Real Housewives of New Jersey",
                "The Real Housewives of Atlanta",
                "The Real Housewives of Beverly Hills"
            ],

            createUser: createUser,
            addCities: addCities,
            addCityStatus: addCityStatus,
            addCity: addCity,

            findAllUsers: findAllUsers,
            findAllCities: findAllCities,
            findAllUnwatchedCities: findAllUnwatchedCities,
            removeCity: removeCity,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            createHousewife: createHousewife,
            addCityHousewife: addCityHousewife,
            getUnverified: getUnverified,
            verify: verify,
            deny: deny,

            updateUser: updateUser,
            deleteUserById: deleteUserById
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

        function createHousewife(user, callback){

            var wifeCreate = {
                username: user.username,
                password: user.password,
                email: user.email,
                verified: false,
                _id: (new Date).getTime(),
                roles: ["Housewife"],
                city: ""
            };

            model.users.push(wifeCreate);
            callback(wifeCreate);
        }

        //Adds City to user
        function addCities(user, username, password, callback){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        for(var j = 0; j<this.city.length; j++){
                            var cityToAdd = {
                                city: this.city[j],
                                View: user[this.city[j]],
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

        function addCityStatus(userSea, userEp, username, password, callback){
            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        for(var j = 0; j<this.city.length; j++){
                            model.users[i].cities[j].Season = userSea[this.city[j]];
                            model.users[i].cities[j].Episode = userEp[this.city[j]];
                        }

                        callback(model.users[i]);
                    }
                }
            }
        }

        function findAllUnwatchedCities(user){
            var unwatched = [];
            for(var i = 0; i < this.city.length; i++) {
                if(!user.cities[i].View){
                    unwatched.push(user.cities[i].city);
                }
            }

            return unwatched;
        }

        function addCity(user, username, password){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){

                        for(var j = 0; j < this.city.length; j++) {
                            if (user.addCity == this.city[j]) {
                                model.users[i].cities[j].View = true;
                                model.users[i].cities[j].Episode = user.addEpisode;
                                model.users[i].cities[j].Season = user.addSeason;
                            }
                        }
                    }
                }
            }
        }

        function removeCity(cityIndex, username, password){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){


                                model.users[i].cities[cityIndex].View = false;
                                model.users[i].cities[cityIndex].Episode = 0;
                                model.users[i].cities[cityIndex].Season = 0;
                            }
                        }
                    }

        }

        function addCityHousewife(wife, username, password, callback){

            for(var i = 0; i < model.users.length; i++){
                if(model.users[i].username == username){
                    if(model.users[i].password == password){
                        model.users[i].city = wife.City;
                        model.users[i].name = wife.name;
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

        function findAllCities(){

            return (model.city);
        }

        function getUnverified(){
            var unverified = [];
            for (var i = 0; i < model.users.length; i++){
                if(model.users[i].roles[0] == 'Housewife'){
                    if(model.users[i].verified == false){
                        unverified.push(model.users[i]);

                    }
                }
            }

            return unverified;
        }

        function verify(wife){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i]._id == wife._id){
                    model.users[i].verified = true;
                }
            }
        }

        //Deletes wife's profile, this isn't best practice, so therefore we might want to change this
        function deny(wife){

            for (var i = 0; i < model.users.length; i++){
                if(model.users[i]._id == wife._id){
                    model.users.splice(i, 1);

                }
            }
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