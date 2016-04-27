/**
 * Created by Bradley on 4/12/16.
 */

//We take the model as an argument so we can CRUD the data

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {

    var auth = authorized;

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.post("/api/assignment/logout", logOut);
    app.post("/api/assignment/user", register, passport.authenticate('local'), login);

    //app.get("/api/assignment/user", auth, findAllUser);
    //app.get("/api/assignment/user/:id",auth, idUser);
    app.put("/api/assignment/user/:id", auth, updateID);

    //adding admin web service requirements
    app.get("/api/assignment/isAdmin", isAdmin);
    app.post("/api/assignment/admin/user", adminCreateUser);
    app.get("/api/assignment/admin/user", findAllUser);
    app.get("/api/assignment/admin/user/:userId", idUser);
    app.delete("/api/assignment/admin/user/:id", deleteID);
    app.put("/api/assignment/admin/user/:id", adminUpdateUser);


    //passport uses local strategy for simple user authentication purposes
    passport.use(new LocalStrategy(localStrategy));
    //set user id from session cookie
    passport.serializeUser(serializeUser);
    //retrieve user id from session cookie
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user[0]._id)
            .then(
                function(user){
                    done(null, user[0]);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    function login(req, res) {

        var user = req.user;
        res.json(user);
    }



    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? [req.user] : '0');
    }

    function isAdmin(req,res){

        if(req.isAuthenticated())
        {
            console.log("they are authenticated");
            console.log(req.user);
            var user = req.user;
            var username = user.username;
            userModel.findUserByUsername(username)
                .then(function(userArray){
                    var user = userArray[0];
                    if(user != null)
                    {
                        console.log("user not be null");
                        console.log(user);
                        var roles = user.roles;
                        var isAdmin = roles.indexOf('admin')>-1;
                        console.log(isAdmin);
                        if(isAdmin){
                            res.json(user);
                        }
                        else
                        {
                            res.send('0');
                        }
                    }
                    else
                    {

                        res.send('0');
                    }
                });

        }
        else
        {
            res.send('0');
        }
    }

    //any additional mappings you might need
    //request to read all users and respond with all users

    //creates a new user embedded in the body of the request, and responds with an array of all users
    function register(req,res, next){

        var user = req.body;                //TODO check if body is correct
        user = userModel.createUser(user)
            .then(function ( doc ) {
                // login user if promise resolved
                //TODO this req.session.currentuser breaks my code
                req.session.currentUser = doc;
                next();
                //res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ); //adds id tag, and stores in mock data

    }
    function findAllUser(req, res){
        // parse the URL for the username
        // parse the URL for the password
        var username = req.query.username;
        var password = req.query.password;

        // if there was a username and password in the URL
        if (username && password){
            //save it as a 'credentials' object
            var credentials = {
                username: username,
                password: password
            };
            var users = userModel.findUserByCredentials(credentials)
                .then(function ( doc ) {

                        res.json(doc);
                    },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        }
                );
        } else if (password == null){
            if (username){
                var user = userModel.findUserByUsername(username)
                    .then(function ( doc ) {

                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        }
                    );
            } else {
                var users = userModel.findAllUsers()
                    .then(function(doc){
                        res.json(doc);
                    },
                    function (err){
                        res.status(400).send(err);
                    });

            }
        }
    }


    //responds with a single user whose id property is equal to the id path parameter
    function idUser(req,res){



        var index = req.params.id;
        var user = userModel.findUserById(index);
        res.json(user);
    }

    //responds with a single user whose username property is equal to the username path parameter
    function usernameUser(req,res){

        //var username =  req.params.username;
        //parse url for the username
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    // responds with a single user whose username property is equal to
    // the username path parameter and its password is equal to the password path parameter
    function usernamePasswordUser(req,res){


        var username = req.query.username;
        var password = req.query.password;
        var cred = {username: username,
                    password: password
                   };
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP
    // request. Responds with an array of all users
    function updateID(req,res){


        var updatedUser = req.body;
        var index = req.params.id;
        var user = userModel.updateUser(index, updatedUser)
            .then(function ( doc ) {

                    console.log("this is the updated user");
                    console.log(doc);
                    req.user = doc;
                    res.json(doc);

                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ); //adds id tag, and stores in mock data

       }

    //removes an existing user whose id property is equal to the id path parameter.
    // Responds with an array of all users
    function deleteID(req,res){

        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);

    }

    function logOut(req,res){

        req.logOut();
        res.send(200);

    }

    function adminCreateUser(req,res){

        var user = req.body;                //TODO check if body is correct
        user = userModel.createUser(user)
            .then(function ( doc ) {
                    // login user if promise resolved
                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ); //adds id tag, and stores in mock data

    }

    function adminUpdateUser(req,res){

        var updatedUser = req.body;
        var index = req.params.id;
        var user = userModel.updateUserAdmin(index, updatedUser)
            .then(function ( doc ) {

                    res.json(doc);

                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ); //adds id tag, and stores in mock data


    }
}