// Load Node modules
var express = require('express');
var alert = require('alert');
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Notes = require("./models/notes");
const session = require('express-session');
const ejs = require('ejs');
const port = 8080;
mongoose.connect("MONGO ADDRESS HERE");
var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(session({secret: 'test', resave: true, saveUninitialized: true,maxAge: 3600000})); 
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.render('pages/Login');
});

app.post("/register", function (req, res) {
    var username = req.body.username;
	var fname = req.body.fname;
	var emailid = req.body.emailid;
	User.register(new User({ username: username, fname: fname, emailid: emailid }),
			req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			alert("User Exists!");
			res.render('pages/Login');
		}
		passport.authenticate("local")(
			req, res, function () {
				alert("You have been registered!");
			res.render("pages/Login");
		});
	});
});

app.get('/Login', function (req, res) {
    res.render('pages/Login');
	if(req.session.messages.includes('Password or username is incorrect')){
		alert("Invalid User");
	}
});

app.get('/about_us', function (req, res) {
    res.render('pages/about_us');
});

app.get('/contact_us', function (req, res) {
    res.render('pages/contact_us');
});

app.post('/validate', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/Login',
	failureMessage: true
  }));

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
  });
  
app.get('/notes', async (req, res) => {
	const notes = await Notes.find({createdBy:req.user.username}).sort('-createdAt');
	res.render('pages/notes', { notes: notes });
  });

app.get('/new', (req, res) => {
	res.render('pages/new');
  });
  
app.post('/notes', async (req, res) => {
	let note = await new Notes({
		title: req.body.title,
	  	description: req.body.description,
	  	createdBy: req.user.username,
	});
	try {
		note = await note.save();
		res.redirect('/notes');
	} catch (e) {
		console.log(e);
		res.render('new');
	}
  });
  
app.post('/notes/:id', async (req, res) => {
	try {
		await Notes.findByIdAndRemove(req.params.id);
	  	res.redirect('/notes');
	} catch (e) {
		console.log(e);
	  	res.redirect('/notes');
	}
  });

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});