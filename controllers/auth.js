var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/profile', isLoggedIn, function(req, res){
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.post]
	}).then(function(user){
		res.render('./profile.ejs', {trackedPosts: user.posts});
	});
});

router.get('/login', function(req, res){
	res.render('auth/login.ejs');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/auth/profile',
	successFlash: 'Login Successful!',
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'
}));

router.get('/signup', function(req, res){
	res.render('auth/signup.ejs');
});

router.post('/signup', function(req, res, next){
	console.log('req.body is', req.body);
	db.user.findOrCreate({
		where: {email: req.body.email},
		defaults: {
			displayName: req.body.displayName,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated) {
			//Good job, you didn't try to make a duplicate!
			passport.authenticate('local', {
				successRedirect: '/auth/profile',
				successFlash: 'Successfully Logged In'
			})(req, res, next);
		}
		else {
			//Bad job, you tried to make a duplicate when you should've logged in
			req.flash('error', 'Email already exists');
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.redirect('/auth/signup');
	});
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Successfully Logged Out');
	res.redirect('/');
});


/* OATH ROUTES */
//Calls the passport-facebook strategy (located in passport config)
router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email']
}));

//Handle the response from Facebook (logic located in passport config)
router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/auth/profile',
	successFlash: 'You successfully logged in via Facebook',
	failureRedurect: '/auth/login',
	failureFlash: 'You tried to login with FB, but FB doesn\'t like you'
}));

module.exports = router;