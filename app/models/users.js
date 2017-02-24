var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    location: String,
    password: String
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Users', userSchema);