var express = require('express');
var route = express.Router();
var authModel = require.main.require('./models/auth-model');


//This route is for showing the registration form
route.get('/registration',function(request,response){
	var info = {};
	info.layout = 'layouts/layout';
	if (request.session.errors != null) {
		info.errors = request.session.errors;
		request.session.errors = null;
	}
	if (request.session.usernameexist != null) {
		info.usernameexist = request.session.usernameexist;
		request.session.usernameexist = null;
	}
	if (request.session.emailexist != null) {
		info.emailexist = request.session.emailexist;
		request.session.emailexist = null;
	}
	if (request.session.oldinfo != null) {
		info.oldinfo = request.session.oldinfo;
		request.session.oldinfo = null;
	}
	response.render('auth/registration',info);
});

//This route is for checking and validate the new 
//New user registration
route.post('/registration',function(request,response){
	var user = {};
	var uniqueFlag = true;
	user.fullname = request.body.fullname;
	user.username = request.body.username;
	user.email = request.body.email;
	user.password = request.body.password;
	user.repassword = request.body.repassword;
	user.usertypeid = 2;
	user.createdate = new Date();

	request.check('fullname','Fullname is epmty').isLength({min:1});
	request.check('email','Email filed is empty').isLength({min:1});
	request.check('username','Username filed is empty').isLength({min:1});
	request.check('password','Password length minimum 4').isLength({min:4});
	request.check('password','Password miss match').equals(request.body.repassword);

	//This value will show in registarion form field value as previously input
	var oldinfo = {};
	oldinfo.fullname = user.fullname;
	oldinfo.username = user.username;
	oldinfo.email = user.email;
	request.session.oldinfo = oldinfo;

	//This is checking the existance of the user name
	authModel.isUsernameExist(request.body.username,function(result){
		if (result) {
			console.log('User name exist');
			request.session.usernameexist = "Username is already exist";
			response.redirect('/auth/registration');
		}else{
			//This is checking the existance of the email
			authModel.isEmailExist(request.body.email,function(result){
				if (result) {
					console.log('Email exist');
					request.session.emailexist = "Email is already exist";
					response.redirect('/auth/registration');
				}else{
					var errors = request.validationErrors();
					if (errors) {
						request.session.errors = errors;
						console.log(errors);
						response.redirect('/auth/registration');
					} else {
						authModel.createNewUserWithID(user,function(result){
							if (result != -1) {
								//Save password to old password table
								var oldpass = {};
								oldpass.userid = result;
								oldpass.password = user.password;
								oldpass.datetime = new Date();
								authModel.saveOldPassword(oldpass,function(result){
									if (result) {
										//All validation ok
										request.session.oldinfo = null;
										request.session.newUserMsg = user.username;
										response.redirect('/');	
									}
								});
							}
						});
					}
				}
			});
		}
	});

	
});

//This route is for login
route.post('/login',function(request,response){
	var auth = {};
	auth.email = request.body.email;
	auth.password = request.body.password;
	auth.url = request.body.url;
	authModel.checkLogin(auth,function(result){
		if (result.length == 1) {
			request.session.userid = result[0].user_id;
			response.redirect('/us'); 
		}else{
			request.session.loginfailed = true;
			response.redirect('/'+auth.url);
		}
	});
	
});

module.exports = route;