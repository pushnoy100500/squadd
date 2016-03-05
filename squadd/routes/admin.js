var express = require('express');
var router = express.Router();
var Admin = require('../models/adminModel');
var User = require('../models/userModel');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('here');
    Admin.findOne({username: username}, function(err, admin) {
      if(err) { return done(err); }
      if(!admin) {
        console.log('wrong username');
        return done(null, false, {message: 'incorrect username'});
      }
      if(!admin.isPasswordMatch(password)) {
        console.log('wrong password');
        return done(null, false, {message: 'incorrect password'});
      }
      console.log('correct credentials');
      return done(null, admin);
    })
  }
));

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});

router.get('/', function(req, res) {
  res.render('adminLogin');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/admin', failureFlash: true }), function(req, res) {
  res.redirect('/admin/listing');
})

router.get('/listing', function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/admin');
  }
}, function(req, res) {
  User.find({}, function(err, users) {
    if(err) console.log(err);
    console.log(users);
    res.render('userListing', {users: users});
  })

})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/admin');
})

module.exports = router;
