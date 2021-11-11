// Load Node modules
var express = require('express');
var alert = require('alert');
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
const session = require('express-session');
const ejs = require('ejs');
const port = 8080;
mongoose.connect("mongodb+srv://<USER>:<PASS>@iwp.igcbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.use(session({secret: 'test', resave: true, saveUninitialized: true,maxAge: 3600000})); 
app.use(passport.initialize());
app.use(passport.session());

// *** GET Routes - display pages ***
// Root Route

app.get('/', function (req, res) {
    res.render('pages/Login');
});

 // Handling user register
app.post("/register", function (req, res) {
	console.log('Got body:', req.body);
    var username = req.body.username;
	var fname = req.body.fname;
	var emailid = req.body.emailid;
	User.register(new User({ username: username, fname: fname, emailid: emailid }),
			req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			alert("User exists");
			res.render('pages/Login');
		}
		passport.authenticate("local")(
			req, res, function () {
			res.render("notes");
		});
	});
});
app.get('/Login', function (req, res) {
    res.render('pages/Login');
});
app.get('/about_us', function (req, res) {
    res.render('pages/about_us');
});
app.get('/contact_us', function (req, res) {
    res.render('pages/contact_us');
});
app.get('/notes', function (req, res) {
    res.render('pages/notes');
});
//Handling user login
app.post('/validate', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/contact_us',
  }));

// Port website will run on
app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});