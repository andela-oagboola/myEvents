require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var routes = require('./app/routes/routes');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportConfig = require('./app/passport-config');

var app = express();

var dbUrl = process.env.MONGO_URL
mongoose.connect(dbUrl);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//passport config
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

routes(app);

app.listen('8080', function(){
    console.log('app started on port 8080');
});

console.log(Date.now());

module.exports = app;