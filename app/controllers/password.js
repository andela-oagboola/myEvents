var bcrypt = require('bcrypt');

module.exports = {
    encode: function(password){
        var saltRounds = 10;
        return new Promise(function(resolve, reject){
            bcrypt.hash(password, saltRounds, function(err, hash){
                if(err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        });
    }
};