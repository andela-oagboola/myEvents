var Events = require('../models/events');

module.exports = {
    newEvent: function(req, res){
        Events.create(req.body, function(err, event){
            if(err){
                res.json(err);
            } else {
                res.json(event);
            }
        });
    },
    getEvent: function(req, res){
        Events.findById(req.params.eventId, function(err, event){
            if(err){
                res.json(err);
            } else {
                res.json(event);
            }
        });
    },
    listEvents: function(req, res){
        Events.find({}, function(err, event){
            if(err){
                res.json(err);
            } else {
                res.json(event);
            }
        });
    },
    updateEvent: function(req, res){
        Events.update({_id: req.params.eventId}, req.body, function(err, event){
            if(err){
                res.json(err);
            } else {
                res.json(event);
            }
        });
    },
    deleteEvent: function(req, res){
        Events.remove(req.params.eventId, function(err, response){
            if(err){
                res.json(err);
            } else {
                res.json(response);
            }
        })
    }
}