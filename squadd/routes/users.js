var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var nodemailer = require('nodemailer');

/* Thank you page. */
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
      });
      //create user
      User.createUser(newUser, function(error, user) {
        if(error) {
        console.error(error);
        } else {
          console.log(user);
          //send email here
          var transporter = nodemailer.createTransport('smtps://squaddapp%40gmail.com:awesometeam@smtp.gmail.com');
          var mailOptions = {
            from: "SQUADD TEAM",
            to: user.email,
            subject: "Welcome to SQUADD",
            html: '<table style="width: 100%;"> <thead> <tr> <td> </td> <td> <h3 style="text-align: center;"> Welcome to SQUADD </h3> </td> <td> </td> </tr> </thead> <tbody> <tr> <td></td> <td> You are about the get into the most awesome DD experience. Please keep an eye on updates from us and our website! </td> <td></td> </tr> </tbody> </table> '
          };
          transporter.sendMail(mailOptions, function(err, info) {
        		if(err) {
        			console.log(err);
        		} else {
        			console.log("message sent " + info.response);
        		}
        	})
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
