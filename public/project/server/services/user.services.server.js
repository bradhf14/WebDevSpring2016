/**
 * Created by Bradley on 4/27/16.
 */



module.exports = function(app, userModel) {
    app.post("/api/project/user", register);
    app.put("/api/project/user/updateCities", updateCities);
    app.put("/api/project/user/updateCityStatus", updateCityStatus);
    app.put("/api/project/user/addCity", addCity);
    app.put("/api/project/user/addCityWife", addCityWife);
    app.delete("/api/project/user/removeCity", removeCity);
    app.get("/api/project/getUnverified", getUnverified);
    app.get("/api/project/user", findAllUser);
    app.get("/api/project/user/:id", idUser);
    app.get("/api/project/login", login);
    app.put("/api/project/user/:id", updateID);
    app.delete("/api/project/user/:id", deleteID);
    app.post("/api/project/verifyWife", verifyWife);
    app.post("/api/project/denyWife",denyWife);


    //creates a new user embedded in the body of the request, and responds with an array of all users
    function register(req, res) {

        var user = req.body;
        user = userModel.createUser(user)
            .then(function (user) {

                    res.json(user);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function login(req, res){

        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        res.json(null);
                    }

                    res.json(user);
                },
                function (err) {
                    if (err) {
                        res.json(null);
                    }
                }
            );
    }

    function updateCities(req,res){

        var username = req.query.username;
        var password = req.query.password;

        var user = req.body;
        user = userModel.addCities(user, username, password)
            .then(function ( user ) {
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function updateCityStatus(req,res){

        var username = req.query.username;
        var password = req.query.password;
        var status = req.body;


        user = userModel.addCityStatus(status, username, password)
            .then(function ( user ) {

                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }


    function addCity(req,res){

        var username = req.query.username;
        var password = req.query.password;
        var cityInfo = req.body;

        user = userModel.addCity(cityInfo, username, password)
            .then(function ( user ) {

                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );



    }

    function addCityWife(req,res){

        var username = req.query.username;
        var password = req.query.password;
        var wifeInfo = req.body;

        user = userModel.addCityWife(wifeInfo, username, password)
            .then(function ( user ) {

                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );



    }

    function removeCity(req,res){

        var username = req.query.username;
        var password = req.query.password;
        var cityIndex = req.query.cityIndex;

        user = userModel.removeCity(cityIndex, username, password)
            .then(function ( user ) {

                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );



    }

    function getUnverified(req,res){

        userModel.getUnverified()
            .then(function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function verifyWife(req,res){
        var wife = req.body;

        userModel.verifyWife(wife)
            .then(function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function denyWife(req,res){
        var wife = req.body;

        userModel.denyWife(wife)
            .then(function (users) {
                    res.json(users);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );


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