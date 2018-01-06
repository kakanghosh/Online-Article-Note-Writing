var express = require('express');
var route = express.Router();
var adminAuth = require.main.require('./models/adminauth-model');


route.all('*',function(request,response,next){
	if (request.session.adminuserid != null) {
		console.log('Admin session: '+request.session.userid);
		response.redirect('/admin');
	}else{
		next();
	}
});

route.get('/login',function(request,response){
	var info = {};
	info.layout = 'layouts/layout';
	info.pagetitle = 'Admin | Login';
	response.render('auth/adminlogin',info);
});
route.post('/login',function(request,response){
	var info = {};
	info.layout = 'layouts/layout';
	info.pagetitle = 'Admin | Login';
	var admin = {
		username : request.body.username,
		typeid : 1,
		password : request.body.password
	}
	adminAuth.chechAdminLogin(admin,function(result){
		console.log(result);
		if (result.length == 1) {
			request.session.adminuserid = result[0].user_id;
			response.redirect('/admin');
		}else{
			info.error = "Invalid User name password";
			response.render('auth/adminlogin',info);
		}
	});
});

module.exports = route;