'use strict';

var User = require('../models/user');

exports.new = function(req, res){
  res.render('users/new', {title: 'Register for NodeHotel'});
};

exports.create = function(req, res){
  var u1 = new User(req.body);
  u1.register(function(err, body){
    if(u1._id){
      res.redirect('/');
    }else{
      res.render('users/new', {title: 'Register for NodeHotel'});
    }
  });
};

exports.login = function(req, res){
  res.render('users/login', {title: 'Log In to NodeHotel'});
};

exports.authenticate = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      req.session.destroy(function(){
        res.render('users/login', {title: 'Bad email or password, please try again!'});
      });
    }
  });
};
