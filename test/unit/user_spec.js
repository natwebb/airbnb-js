/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var User;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var u1 = new User({role:'host', email:'sue@nomail.com', password:'1234'});
      u1.register(function(err){
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      var u1 = new User({role:'host', email:'bob@nomail.com', password:'1234'});
      expect(u1.role).to.equal('host');
      expect(u1.email).to.equal('bob@nomail.com');
      expect(u1.password).to.equal('1234');
      done();
    });
  });

  describe('#register', function(){
    it('should register a user', function(done){
      var u1 = new User({role:'host', email:'mocha-tests@hotmail.com', password:'1234'});
      u1.register(function(err, body){
        expect(err).to.not.be.ok;
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        body = JSON.parse(body);
        expect(body.id).to.be.ok;
        done();
      });
    });

    it('should not register a user with duplicate email', function(done){
      var u1 = new User({role:'host', email:'sue@nomail.com', password:'1234'});
      u1.register(function(err){
        expect(err).to.not.be.ok;
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.undefined;
        done();
      });
    });
  });

  describe('.findByEmailAndPassword', function(){
    it('should find a user by email and check password', function(done){
      User.findByEmailAndPassword('sue@nomail.com', '1234', function(user){
        expect(user.email).to.equal('sue@nomail.com');
        expect(user.password).to.have.length(60);
        done();
      });
    });

    it('should fail to find a user with bad email', function(done){
      User.findByEmailAndPassword('soo@nomail.com', '1234', function(record){
        expect(record).to.be.null;
        done();
      });
    });

    it('should fail to find a user with bad password', function(done){
      User.findByEmailAndPassword('sue@nomail.com', '5678', function(record){
        expect(record).to.be.null;
        done();
      });
    });
  });

});

