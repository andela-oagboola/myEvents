var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();
chai.use(chaiHttp);
var Events = require('../../app/models/events');
var Users = require('../../app/models/users');

describe('events', function(){

    var dummyEvent, dummyResponse;
    afterEach(function(done){
        Events.remove(function(){
        });
        Users.remove(function(){
            Users.remove(function(){
                done();
            })
        });
    });
    beforeEach(function(done){
        dummyEvent = {
            title: 'All hands',
            venue: 'Ikorodu',
            time: '17:30',
            date: Date.now()
        }
        Events.create(dummyEvent, function(err, res){
            dummyResponse = res;
            done();
        });
    });

    describe('/CREATE', function(){
        it('should create an event without errors', function(done){
            var event = {
                title: 'Ring Ceremony',
                venue: '5th floor',
                time: '9:30',
                date: Date.now()
            }

            chai.request(server)
                .post('/')
                .send(event)
                .end(function(err, res){
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('title').eql(event.title);
                    res.body.should.have.property('venue').eql(event.venue);
                    res.body.should.have.property('time').eql(event.time);
                    done();
                });
        });
    });

    describe('/READ', function(){
        it('should read an event without errors', function(done){
            chai.request(server)
                .get('/'+ dummyResponse._id)
                .end(function(err, res){
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    res.body.should.have.property('title').eql(dummyEvent.title);
                    res.body.should.have.property('venue').eql(dummyEvent.venue);
                    res.body.should.have.property('time').eql(dummyEvent.time);
                    done();
                });
        });
    });

    describe('/LIST', function(){
        it('should list events without errors', function(done){
            chai.request(server)
                .get('/')
                .end(function(err, res){
                    res.body.should.be.a('array');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/UPDATE', function(){
        it('should update an event without errors', function(done){
            event = {
                title: 'Lunch',
                venue: 'Cafe',
                time: '13:30'
            }
            chai.request(server)
                .put('/' + dummyResponse._id)
                .send(event)
                .end(function(err, res){
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/DELETE', function(){
        it('should delete an event without errors', function(done){
            chai.request(server)
                .delete('/' + dummyResponse._id)
                .end(function(err, res){
                    res.body.should.be.a('object');
                    res.body.should.have.property('n').eql(1);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/SIGNUP', function(){
        it('should create a new user with valid credentials', function(done){
            var user = {
                email: 'xyz@abc.com',
                password: 'laide'
            }
            chai.request(server)
                .post('/signup')
                .send(user)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql(user.email);
                    done();
                });
        });
    });

});
