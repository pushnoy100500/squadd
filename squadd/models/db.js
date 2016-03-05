var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/squadd');
var db = mongoose.connection;
db.on('error', console.error.bind(console, ' db connection error'));
db.once('open', function() {
  console.log("connected to database successfully");
});
module.exports = db;
