var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});
router.post("/send", function(req, res, next) {
	var transporter = nodemailer.createTransport('smtps://squaddapp%40gmail.com:awesometeam@smtp.gmail.com');

	var mailOptions = {
		from: "Squadd app website",
		to: "squaddapp@gmail.com",
		subject: "website submission",
		text: 'You have a new submission with the following details... Name: ' +req.body.name+ '<br> Message:' + req.body.message,
		html: "<p>You've got a new website submission</p><ul><li>from: " + req.body.name + "</li><li>email: " + req.body.email + "</li><li>Message: " + req.body.message + "</li>"
		
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log(err);
			res.redirect("/");
		} else {
			console.log("message sent " + info.response);
			res.redirect("/");
		}

	})
})

module.exports = router;