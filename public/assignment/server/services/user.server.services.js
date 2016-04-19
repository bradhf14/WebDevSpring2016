/**
 * Created by Bradley on 4/12/16.
 */

//We take the model as an argument so we can CRUD the data

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUser);
    app.get("/api/assignment/user/:id", idUser);
    app.put("/api/assignment/user/:id", updateID);
    app.delete("/api/assignment/user/:id", deleteID);

    //any additional mappings you might need

    // request to read all users and respond with all users


    //creates a new user embedded in the body of the request, and responds with an array of all users
    function register(req,res){

        console.log("we call the register in the server user.server file, and this is what is passed to the model")
        console.log(req.body);
        var user = req.body;                //TODO check if body is correct
        console.log(user);
        user = userModel.createUser(user);  //adds id tag, and stores in mock data
        console.log(user);
        //req.session.currentUser = user;     //assign current user of session (part of express.js)
        res.json(user);                     //return json object user, might need to switch to array of all users

    }

    function findAllUser(req, res){
        // parse the URL for the username
        // parse the URL for the password
        var username = req.query.username;
        var password = req.query.password;

        // if there was a username and password in the URL
        if (username && password){
            //save it as a 'credentials' object
            console.log("we are finding user by credentials");
            var credentials = {
                username: username,
                password: password
            };
            var users = userModel.findUserByCredentials(credentials);
            console.log(users);
            res.json(users);
        } else if (password == null){
            if (username){
                console.log("we are finding user by username");
                var user = userModel.findUserByUsername(username);
                res.json(user);
            } else {
                console.log("we are finding all users");
                var users = userModel.findAllUsers();
                res.json(users);
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

        console.log("We get to user.server.services.js");
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
        console.log("we are at the updateID function");
        console.log(updatedUser);
        console.log(index);
        var user = userModel.updateUser(index, updatedUser);  //TODO maybe remove return statement from updateUser
        //var users = userModel.findAllUsers();
        res.json(user);
       }

    //removes an existing user whose id property is equal to the id path parameter.
    // Responds with an array of all users
    function deleteID(req,res){

        var id = req.params.id;
        var users = userModel.deleteUser(id);
        res.json(users);

    }
}