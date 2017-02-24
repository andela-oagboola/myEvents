var Users = require('../models/users');
var  password = require('./password');
var passport = require('passport');

module.exports = {
    signup: function(req, res){
        var user = req.body;
        password.encode(user.password).then(function(hashedPwd){
            user.password = hashedPwd;
            Users.create(user, function(err, user){
                if (err){
                    res.json(err);
                } else {
                    res.json(user);
                }
            })
        }).catch(function(err){
            res.json(err);
        });
    },
    login: function(req, res){
        passport.authenticate('local', function(err, user, info){
            console.log(err, user, info);
        });
    }
};