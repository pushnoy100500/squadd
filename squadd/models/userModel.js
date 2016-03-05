var mongoose = require('mongoose');
// mongoose database connection
var db = require('./db');

//User schema
var UserSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: true
  }//,
  // password: {
  //   type: String
  // }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}
