var server = require('../../server');
var events = require('../controllers/events');
var users = require('../controllers/users')
var passport = require('passport');

module.exports = function(server){
    server.route('/')
        .post(events.newEvent)
        .get(events.listEvents)

    server.route('/:eventId')
        .get(events.getEvent)
        .put(events.updateEvent)
        .delete(events.deleteEvent)

    server.post('/signup', users.signup);

    server.post('/login', users.login);
}

