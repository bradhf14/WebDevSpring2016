/**
 * Created by Bradley on 4/12/16.
 */
var users = require("./user.mock.json");
// load q promise library
// figure out why we do this later
var q = require("q");

//javascript node.js module for User
module.exports = function(db, mongoose) {

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,                         //C
        findUserByUsername: findUserByUsername,         //R Test
        findUserByCredentials: findUserByCredentials,   //R
        findUserById: findUserByID,                     //R Test
        findAllUsers: findAllUsers,                     //R Test
        updateUser: updateUser,                         //U
        deleteUser: deleteUser                          //D Test
        //any other necessary ones to implement here, look at CRUD requirements (believe all are included)
    };

    //returns this api
    return api;

    //accepts user, adds to users array, and returns array of users
    function createUser(user) {

        //use q to defer the response
        var deferred  = q.defer();

        UserModel.create(user, function(err,doc){

            if (err){
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();

        //find user by username

        UserModel.find({
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

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        //find user by username and password
        UserModel.find
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

        UserModel.find({
            _id: {$in: id}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    //takes in no argument, and returns the collection
    function findAllUsers() {

        var deferred = q.defer();

        UserModel.find(
            function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;

    }

    //takes id and object instance as arguments, finds the object with id
    //update the found instance, return found instance, otherwise null?
    function updateUser(userId, updatedUser) {

        var deferred = q.defer();

        UserModel.update({_id: userId},{$set:{
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            username: updatedUser.username,
            password: updatedUser.password,
            emails: [updatedUser.emails[0]]
            }
        },
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(findUserByID(userId));
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

        UserModel.remove({_id: userId},
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
