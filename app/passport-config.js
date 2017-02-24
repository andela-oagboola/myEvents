var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');

module.exports = function(){

    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
      function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                console.log('error with passport', err);
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
          return done(null, user);
        });
      }
    ));
};
