var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);