var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Events', eventsSchema);