var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
//goes into node modules and directory and look for mongoose library
var mongoose      = require('mongoose');

//will likely need to change the DB name
mongoose.connect('mongodb://localhost/NewDB');
//console.log(mongoose);


// connect to the database
var db = "Figure this out later";//mongoose.connect(connectionString);


//TODO figure out how to attach schemas



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 4000;
app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);