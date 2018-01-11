require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn.js');
var passport  = require('./config/passportConfig.js');
var session = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
app.use(session({	//session has to be ABOVE passport and flash
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

app.get('/', function(req, res){
	res.render('home.ejs');
});

app.get('/profile', isLoggedIn, function(req, res){
	res.render('profile.ejs');
});

app.use('/auth', require('./controllers/auth'));
app.use('/sites', require('./controllers/sites'));
app.use('/posts', require('./controllers/posts'));
app.use('/topics', require('./controllers/topics'));
app.use('/comments', require('./controllers/comments'));

app.listen(process.env.PORT || 3000);