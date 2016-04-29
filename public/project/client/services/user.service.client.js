//useful in various parts of application, hence why we create this

(function(){
    "use strict";
    angular
        .module("HousewivesApp")
        .factory("UserService", UserService);

    function UserService($http) {

        //TODO don't need model anymore, can remove
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
                    "email" : "bob@gmail.com",
                    "username":"Bob",
                    "password":"queen",
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
                        View: true,
                        Season: 6,
                        Episode: 2
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
            findUserById: findUserById,
            addCityStatus: addCityStatus,
            addCity: addCity,
            addCityHousewife: addCityHousewife,
            login: login,

            findAllUsers: findAllUsers,
            findAllCities: findAllCities,
            findAllUnwatchedCities: findAllUnwatchedCities,
            removeCity: removeCity,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,


            getUnverified: getUnverified,
            verify: verify,
            deny: deny,

            updateUser: updateUser,
            deleteUserById: deleteUserById
        };

        return model;

        function createUser(user,callback){

            return $http.post("/api/project/user", user);
        }

        //Adds City to user
        function addCities(user, username, password, callback){

            return $http.put("/api/project/user/updateCities/?username=" + username + "&password=" + password, user);

        }

        function findUserById(id){
            return $http.get("/api/project/user/"+id);

        }

        function addCityStatus(status, username, password, callback){


            return $http.put("/api/project/user/updateCityStatus/?username=" + username + "&password=" + password, status);
        }

        //TODO move this over to server
        function findAllUnwatchedCities(user){
            var unwatched = [];
            for(var i = 0; i < this.city.length; i++) {
                if(!user.cities[i].View){
                    unwatched.push(user.cities[i].city);
                }
            }

            return unwatched;
        }

        function addCity(cityInfo, username, password){

            return $http.put("/api/project/user/addCity/?username=" + username + "&password=" + password,cityInfo);
        }


        function removeCity(cityIndex, username, password){

            return $http.delete("/api/project/user/removeCity/?username=" + username + "&password=" + password + "&cityIndex=" + cityIndex);

        }

        function addCityHousewife(wife, username, password){

            return $http.put("/api/project/user/addCityWife/?username=" + username + "&password=" + password, wife);

        }

        function login(username, password) {
            return $http.get("/api/project/login?username=" + username + "&password=" + password);
        }


        function findUserByUsernameAndPassword(username, password){
            return $http.get ("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(){
            return $http.get ("/api/project/admin/user");
        }

        //TODO Move over to server
        function findAllCities(){

            return (model.city);
        }

        function getUnverified(){

            return $http.get("/api/project/getUnverified");

        }

        function verify(wife){

            return $http.post("/api/project/verifyWife", wife);

        }

        //Deletes wife's profile, this isn't best practice, so therefore we might want to change this
        function deny(wife){

            return $http.post("/api/project/denyWife", wife);

        }


        function deleteUserById(userId){
            return $http.delete ("/api/project/user/" + userId);
        }

        function updateUser (userId, user) {
            return $http.put ("/api/project/user/" + userId, user);
        }


    }
})();