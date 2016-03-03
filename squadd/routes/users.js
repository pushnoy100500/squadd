var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('thankYou');
});
router.post('/register', function(req, res, next) {
  //get form values
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  //var password = req.body.password;
//validate request body
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  //req.checkBody('password', 'password is required').notEmpty();
  //check for errors
  var errors = req.validationErrors();
  if(errors) {
    res.location('back');
    res.render('index', {
      errors: errors,
      firstName: firstName,
      lastName: lastName,
      email: email
      //password: password
    });
  } else {

      var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email
      //  password: encrypt(password)
      });
      //create user
      User.createUser(newUser, function(error, user) {
        if(error) {
        //  throw error
        console.error(error);
        } else {
        console.log(user);
    //    req.flash("success", "You are now registered and may log in");
    //    res.location('/users');
          res.redirect('../users');
        }
      })
    }
  // res.send(firstName + ' ' + lastName + " " + email + " " + password);
})
//encrypts data
// function encrypt(text){
//   var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
//   var crypted = cipher.update(text,'utf8','hex')
//   crypted += cipher.final('hex');
//   return crypted;
// }

module.exports = router;
