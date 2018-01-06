//Variables
var express = require('express');
var path = require('path');
var expressLayouts = require('express-ejs-layouts'); 
var bodyParser = require('body-parser');
var validator = require('express-validator');
var expressSession = require('express-session');
var app = express();
var port = 8000;
var dateFormat = require('dateformat');
var now = new Date();
var d = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
console.log(d);
//var userModel = require.main.require('./models/db');

var admin = require('./controllers/admin');
var userauth = require('./controllers/authentication');
var adminauth = require('./controllers/adminauth');
var commonuser = require('./controllers/commonuser');
var user = require('./controllers/user');


//App Configuration
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('view options', { layout: false });

//Middleware
app.use(express.static(path.join(__dirname,'public')));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(validator());
app.use(expressSession({secret:'asdHasd%^5w', saveUninitialized: true, resave: false}));


//Routes
app.use('/ad',adminauth);
app.use('/admin',admin);
app.use('/auth',userauth);
app.use('/us',user);
app.use('/',commonuser);

//Server setting
app.listen(port,function(){
	console.log('Server sarted at '+port+'....');
});