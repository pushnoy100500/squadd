var mongoose = require('mongoose');
var crypto = require('crypto');
//mongoose database connection
var db = require('./db');

var AdminSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});
AdminSchema.methods.isPasswordMatch = function(candidatePass) {
  if(encrypt(candidatePass) === this.password) {
    return true;
  } else {
    return false;
  }
}

//encrypts data
function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
var Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
