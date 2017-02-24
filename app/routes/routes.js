var server = require('../../server');
var events = require('../controllers/events');

module.exports = function(server){
    server.route('/')
        .post(events.newEvent)
        .get(events.listEvents)

    server.route('/:eventId')
        .get(events.getEvent)
        .put(events.updateEvent)
        .delete(events.deleteEvent)
}

