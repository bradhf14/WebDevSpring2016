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

    UserModel.create({username: "bradley"},
    function(err, results){
        console.log("we created a user");
        console.log(err);
        console.log(results);
    });

    var api = {
        createUser: createUser,                         //C
        findUserByUsername: findUserByUsername,         //R
        findUserByCredentials: findUserByCredentials,   //R
        findUserById: findUserByID,                     //R
        findAllUsers: findAllUsers,                     //R
        updateUser: updateUser,                         //U
        deleteUser: deleteUser                          //D
        //any other necessary ones to implement here, look at CRUD requirements (believe all are included)
    };

    //returns this api
    return api;

    //accepts user, adds to users array, and returns array of users
    function createUser(user) {

        //use q to defer the response
        console.log("user that is passed in");
        console.log(user);
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

        //unedited below

        //user._id = (new Date()).getTime();
        //users.push(user);
        //return user;
    }

    function findUserByUsername(username) {

        for(var u in users) {
            if( users[u].username == username) {
                return users[u];
            }
        }
        return null;

    }

    function findUserByCredentials(credentials) {

        for(var u in users) {
            if( users[u].username == credentials.username &&
                users[u].password == credentials.password) {
                return users[u];
            }
        }

        return null;
    }

    //takes in ID, finds instance, return the instance found, or null otherwise
    function findUserByID(id) {

        for(var u in users) {
            if( users[u]._id == id) {
                return users[u];
            }
        }
        return null;
    }

    //takes in no argument, and returns the collection
    function findAllUsers() {

        return users;
    }

    //takes id and object instance as arguments, finds the object with id
    //update the found instance, return found instance, otherwise null?
    function updateUser(userId, updatedUser) {

        for(var u in users) {

            if( users[u]._id == userId) {

                users[u].firstName = updatedUser.firstName;
                users[u].lastName = updatedUser.lastName;
                users[u].username = updatedUser.username;
                users[u].password = updatedUser.password;
                users[u].email = updatedUser.email;
                return users[u];
            }
        }
        return null;
    }

    //should accept an ID as an argument, remove instance of object with that ID,
    //return updated list?
    //need to check that this works (once we work with admin page)
    function deleteUser(userId){
        for (var u in users){
            if (users[u]._id == userId){
                users.splice(u, 1);
            }
        }
        return users;
    }
}
