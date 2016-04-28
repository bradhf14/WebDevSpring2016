/**
 * Created by Bradley on 4/27/16.
 */



module.exports = function(app, userModel) {
    app.post("/api/project/user", register);
    app.put("/api/project/user/updateCities", updateCities);
    app.get("/api/project/user", findAllUser);
    app.get("/api/project/user/:id", idUser);
    app.put("/api/project/user/:id", updateID);
    app.delete("/api/project/user/:id", deleteID);


    //any additional mappings you might need
    //request to read all users and respond with all users

    //creates a new user embedded in the body of the request, and responds with an array of all users
    function register(req,res){

        console.log("we are on the server side now");
        var user = req.body;                //TODO check if body is correct
        user = userModel.createUser(user)
            .then(function ( user ) {

                    console.log("they are created");
                    console.log(user);
                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            ); //adds id tag, and stores in mock data

    }


    function updateCities(req,res){

        var username = req.query.username;
        var password = req.query.password;

        var user = req.body;                //TODO check if body is correct
        user = userModel.addCities(user, username, password)
            .then(function ( user ) {

                    //TODO this req.session.currentuser breaks my code
                    //req.session.currentUser = doc;
                    console.log("this is waht we return to the client say WERTTTT OKAUUURR");
                    console.log(user);
                    res.json(user);
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
                        //TODO this req.session.currentuser breaks my code
                        //req.session.currentUser = doc;
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
                            //TODO this req.session.currentuser breaks my code
                            //req.session.currentUser = doc;
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
        userModel.findUserById(index)
            .then(function(response){
                res.json(response);
            });

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
}