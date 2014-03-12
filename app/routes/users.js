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
