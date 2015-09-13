var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require('mongoose');
var passport = require('passport');
var expressJWT = require('express-jwt');
var aws = require('./config/aws');


var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/taggy'
mongoose.connect(databaseURL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
// Setup Passport
require('./config/passport')(passport);
app.use(passport.initialize());
// Setting view folder for single index.html file
app.set("views", "./public");
app.engine('html', require('ejs').renderFile);

// Serve all js, css, html from the public folder
app.use(express.static(__dirname + '/public'));


// Serving bower_components from root. Might change to public later
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(logger('dev'));


var routes = require('./config/routes');
app.use('/api', routes);


app.use('/api', expressJWT({secret: process.env.TAGGY_SECRET})
  .unless({path: ['/api/login', '/api/signup', '/api/facebook', '/api/facebook/callback'], method: ['post', 'get']}));

 app.use(function (error, request, response, next) {
   if (error.name === 'UnauthorizedError') {
     response.status(401).json({message: 'You need an authorization token to view confidential information.'});
   } else {
     next()
   }
 }); 

app.get('/', function(req, res) {
   res.render("index.html");
 });



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ('OPTIONS' == req.method) {
         res.send(200);
     }
     else {
         next();
     }
});


app.listen(process.env.PORT || 5000);