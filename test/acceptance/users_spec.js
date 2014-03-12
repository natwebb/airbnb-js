/* jshint expr:true */

'use strict';

process.env.DBNAME = 'airbnb-test';
var request = require('supertest');
var app = require('../../app/app');
var expect = require('chai').expect;
var User;

describe('User', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      request(app)
      .post('/register')
      .field('email', 'bob@nomail.com')
      .field('password','1234')
      .field('role', 'Host')
      .end(function(err, res){
        done();
      });
    });
  });

  describe('GET /register', function(){
    it('should display the register user page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should register a new user', function(done){
      request(app)
      .post('/register')
      .field('email', 'sue@nomail.com')
      .field('password','1234')
      .field('role', 'Host')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        expect(res.text).to.include('Redirecting to /');
        done();
      });
    });

    it('should not register a new user with duplicate email', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob@nomail.com')
      .field('password','1234')
      .field('role', 'Host')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });
});
