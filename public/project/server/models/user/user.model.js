/**
 * Created by Bradley on 4/27/16.
 */

var q = require("q");

//javascript node.js module for User
module.exports = function(db, mongoose) {

    //load user schema
    var UserSchemaP = require("./user.schema.server.js")(mongoose);

    //create user model from schema
    var UserModelP = mongoose.model('UserP', UserSchemaP);

    //TODO will move into DB, don't want it as static here
    var city = [
        "The Real Housewives of Orange County",
        "The Real Housewives of New York City",
        "The Real Housewives of New Jersey",
        "The Real Housewives of Atlanta",
        "The Real Housewives of Beverly Hills"
    ];

    var api = {
        createUser: createUser,                         //C
        addCities: addCities,                           //U
        addCityStatus: addCityStatus,                   //U
        addCity: addCity,                               //U
        findUserByUsername: findUserByUsername,         //R Test
        findUserByCredentials: findUserByCredentials,   //R
        findUserById: findUserByID,                     //R Test
        findAllUsers: findAllUsers,                     //R Test
        removeCity: removeCity,                         //D
        addCityWife: addCityWife,                       //U
        getUnverified: getUnverified,                    //R
        verifyWife: verifyWife,
        denyWife: denyWife,

        //updateUser: updateUser,                         //U
        //updateUserAdmin: updateUserAdmin,               //U
        deleteUser: deleteUser                          //D Test
        //any other necessary ones to implement here, look at CRUD requirements (believe all are included)
    };

    //returns this api
    return api;

    //accepts user, adds to users array, and returns array of users
    function createUser(user) {

        //use q to defer the response
        var deferred = q.defer();

        var citiesToAdd = [];
        for (var j = 0; j < city.length; j++) {
            var cityToAdd = {
                city: city[j],
                View: false,
                Season: 0,
                Episode: 0
            };
            citiesToAdd.push(cityToAdd);
        }
        user.cities = citiesToAdd;

        UserModelP.create(user, function (err, doc) {

            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //TODO a lot of these functions can be simplified if I used the findUserByCredentials function rather than
    //use the find search each time
    function addCities(userIn, username, password) {

        var deferred = q.defer();

        UserModelP.find
        ({
            $and: [{username: username}, {password: password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {

                var citiesToAdd = [];
                for (var j = 0; j < city.length; j++) {
                    var cityToAdd = {
                        city: city[j],
                        View: userIn[city[j]],
                        Season: 0,
                        Episode: 0
                    };
                    citiesToAdd.push(cityToAdd);
                }

                UserModelP.update({_id: user[0]._id}, {
                    $set: {
                        cities: citiesToAdd
                    }
                }, function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(findUserByID(user[0]._id));
                    }
                });

            }
        });

        return deferred.promise;

    }


    function addCityStatus(status, username, password) {

        var deferred = q.defer();

        UserModelP.find
        ({
            $and: [{username: username}, {password: password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {

                var citiesToUpdate = user[0].cities;
                for (var j = 0; j < city.length; j++) {
                    citiesToUpdate[j].Season = status.Season[city[j]];
                    citiesToUpdate[j].Episode = status.Episode[city[j]];
                }

                UserModelP.update({_id: user[0]._id}, {
                    $set: {
                        cities: citiesToUpdate
                    }
                }, function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(findUserByID(user[0]._id));
                    }
                });
            }
        });

        return deferred.promise;


    }


    function addCity(cityInfo, username, password) {

        var deferred = q.defer();

        UserModelP.find({
            $and: [{username: username}, {password: password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {

                var citiesToUpdate = user[0].cities;


                for (var j = 0; j < city.length; j++) {

                    if (cityInfo.addCity == city[j]) {
                        citiesToUpdate[j].View = true;
                        citiesToUpdate[j].Episode = cityInfo.addEpisode;
                        citiesToUpdate[j].Season = cityInfo.addSeason;
                    }
                }

                UserModelP.update({_id: user[0]._id}, {
                    $set: {
                        cities: citiesToUpdate
                    }
                }, function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(findUserByID(user[0]._id));
                    }
                });
            }
        });

        return deferred.promise;
    }

    function removeCity(cityIndex, username, password) {

        var deferred = q.defer();

        UserModelP.find({
            $and: [{username: username}, {password: password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {

                var citiesToUpdate = user[0].cities;

                for (var j = 0; j < city.length; j++) {

                    if (cityIndex == j) {
                        citiesToUpdate[j].View = false;
                        citiesToUpdate[j].Episode = 0;
                        citiesToUpdate[j].Season = 0;
                    }
                }

                UserModelP.update({_id: user[0]._id}, {
                    $set: {
                        cities: citiesToUpdate
                    }
                }, function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(findUserByID(user[0]._id));
                    }
                });
            }
        });

        return deferred.promise;


    }

    function addCityWife(wifeInfo, username, password) {

        var deferred = q.defer();

        UserModelP.find({
            $and: [{username: username}, {password: password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {

                UserModelP.update({_id: user[0]._id}, {
                    $set: {
                        name: wifeInfo.name,
                        city: wifeInfo.City
                    }
                }, function (err, response) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(findUserByID(user[0]._id));
                    }
                });
            }
        });

        return deferred.promise;

    }


    function findUserByUsername(username) {

        var deferred = q.defer();


        UserModelP.find({
            username: {$in: username}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;

    }

    function getUnverified(){

        var deferred = q.defer();

        UserModelP.find({
            $and: [{roles: ['Housewife']},{verified: false}]
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function verifyWife(wife){
        var deferred = q.defer();

        UserModelP.update({_id: wife._id},{$set:{
            verified: true
        }}, function (err, wife) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(wife);
            }
        });

        return deferred.promise;

    }

    //When wife is denied, they are demoted to a fan
    function denyWife(wife){
        var deferred = q.defer();

        UserModelP.update({_id: wife._id},{$set:{
            roles: ['Fan'],
        }}, function (err, wife) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(wife);
            }
        });

        return deferred.promise;

    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        //find user by username and password
        UserModelP.find
        ({$and: [{username: credentials.username},{password:credentials.password}]
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    //takes in ID, finds instance, return the instance found, or null otherwise
    function findUserByID(id) {

        var deferred = q.defer();

        //find user by ID
        UserModelP.find({
            _id: {$in: id}
        }, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    //takes in no argument, and returns the collection
    function findAllUsers() {

        var deferred = q.defer();

        UserModelP.find(
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });

        return deferred.promise;

    }



    //should accept an ID as an argument, remove instance of object with that ID,
    //return updated list?
    //need to check that this works (once we work with admin page)
    function deleteUser(userId){

        //TODO how to handle promise with this one?

        var deferred = q.defer();

        UserModelP.remove({_id: userId},
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;

    }
}
