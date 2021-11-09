// Load Node modules
var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(8080);

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/Login');
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
app.post('/notes', function (req, res) {
    res.render('pages/notes');
});