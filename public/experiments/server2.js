/**
 * Created by Bradley on 4/7/16.
 */


//instance of express library using require method
var express = require('express');
//creating instance of that webserver
var app = express();

//host static content in particularly directory
app.use(express.static(__dirname + '/public'))

//respond to root requrest with hard coded text
app.get('/', function(req, res){
    res.send('hello world');
});


//listen function for port 3000, common port for node.js
app.listen(3000);