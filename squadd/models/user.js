var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/squadd');
var db = mongoose.connection;

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
    index: true
  },
  password: {
    type: String
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}
