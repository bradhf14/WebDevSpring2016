/**
 * Created by Bradley on 4/12/16.
 */

//We take the model as an argument so we can CRUD the data

module.exports = function(app, userModel, db) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", allUsers);
    app.get("/api/assignment/user/:id", idUser);
    app.get("/api/assignment/user?username=username", usernameUser);
    app.get("/api/assignment/user?username=alice&password=wonderland", aliceUser);
    app.put("/api/assignment/user/:id", updateID);
    app.delete("/api/assignment/user/:id", deleteID);

    //any additional mappings you might need

    //creates a new user embedded in the body of the request, and responds with an array of all users
    function register(req,res){

        var user = req.body;                //TODO check if body is correct
        user = userModel.createUser(user);  //adds id tag, and stores in mock data
        req.session.currentUser = user;     //assign current user of session (part of express.js)
        res.json(user);                     //return json object user, might need to switch to array of all users

    }

    function allUsers(req,res){

        //responds with an array of all users
    }

    //responds with a single user whose id property is equal to the id path parameter
    function idUser(req,res){

        var index = req.params.id;
        var user = userModel.findUserById(index);
        res.json(user);
    }

    function usernameUser(req,res){
        //responds with a single user whose username property is equal to the username path parameter
        var username =  req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function aliceUser(req,res){
        // responds with a single user whose username property is equal to
        // the username path parameter and its password is equal to the password path parameter
        var cred = {username: req.params.username,
                    password: req.params.password};
        var user = userModel.findUserByCredentials(cred);
        res.json(user);
    }

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP
    // request. Responds with an array of all users
    function updateID(req,res){

        var updatedUser = req.body;
        var index = req.params.id;
        var user = userModel.updateUser(index, updatedUser);
        var users = userMode.findAllUsers();
        res.json(users);
       }

    function deleteID(req,res){

        //removes an existing user whose id property is equal to the id path parameter.
        // Responds with an array of all users
    }


    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.get("/api/project/omdb/profile/:userId", profile);



    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        var movieImdbIDs = user.likes;
        var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        user.likesMovies = movies;
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
}