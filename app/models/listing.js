'use strict';

module.exports = Listing;

var listings = global.nss.db.collection('listings');

function Listing(data){
  this.name = data.name;
  this.amount = parseFloat(data.amount);
  this.address = data.address;
  this.coordinates = [parseFloat(data.lat), parseFloat(data.lng)];
}

Listing.prototype.insert = function(fn){
  listings.insert(this, function(err, record){
    fn(err);
  });
};

Listing.findAll = function(fn){
  listings.find().toArray(function(err, records){
    fn(records);
  });
};
