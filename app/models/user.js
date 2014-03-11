'use strict';

module.exports = User;

function User(data){
  this.role = data.role;
  this.email = data.email;
  this.password = data.password;
}
