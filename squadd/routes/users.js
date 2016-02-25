var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});
router.post('/register', function(req, res, next) {
  //get form values
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
//validate request body
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  //check for errors
  var errors = req.validationErrors();
  if(errors) {
    res.location('back');
    res.render('index', {
      errors: errors,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  } else {
      var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      //create user
      User.createUser(newUser, function(error, user) {
        if(error) {
          throw error
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

module.exports = router;
