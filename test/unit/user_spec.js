/* jshint expr:true */

'use strict';

process.env.DBNAME = 'bartertown-test';
var expect = require('chai').expect;
var User;
//var fs = require('fs');
//var exec = require('child_process').exec;

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
      done();
    });
  });

  describe('new', function(){
    it('should create a new User object', function(done){
      var u1 = new User({role:'host', email:'adam@adam.com', password:'1234'});
      expect(u1.role).to.equal('host');
      expect(u1.email).to.equal('adam@adam.com');
      expect(u1.password).to.equal('1234');
      done();
    });
  });
});

