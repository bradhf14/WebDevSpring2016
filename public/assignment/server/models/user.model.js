/**
 * Created by Bradley on 4/12/16.
 */
var mock = require("./user.mock.json");

module.exports = function() {


    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserByID,
        createUser: createUser
        //any other necessary ones to implement here, look at CRUD requirements
    };

    return api;

    function findUserByUsername(username) {

        for(var u in mock) {
            if( mock[u].username === username) {
                return mock[u];
            }
        }
        return null;

    }

    function findUserByCredentials(credentials) {

        for(var u in mock) {
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByID(ID) {

        for(var u in mock) {
            if( mock[u]._id === ID) {
                return mock[u];
            }
        }
        return null;

    }

    function createUser(user) {
        user._id = (new Date()).getTime();
        mock.push(user);
        return user;
    }
}
