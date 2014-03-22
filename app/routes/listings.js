'use strict';

var Listing = require('../models/listing');

exports.index = function(req, res){
  Listing.findAll(function(listings){
    res.render('listings/index', {title: 'Listings', listings:listings});
  });
};

exports.new = function(req, res){
  res.render('listings/new', {title: 'New Listing'});
};

exports.create = function(req, res){
  var listing = new Listing(req.body);
  listing.insert(function(){
    res.redirect('/');
  });
};
