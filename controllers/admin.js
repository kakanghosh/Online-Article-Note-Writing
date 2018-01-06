var express = require('express');
var route = express.Router();
var adminModel = require.main.require('./models/admin-model');
var userModel = require.main.require('./models/user-model');
var articleModel = require.main.require('./models/article-model');
var admin = null;
var dateFormat = require('dateformat');

route.all('*',function(request,response,next){
	if (request.session.adminuserid == null || typeof request.session.adminuserid == 'undefined') {
		console.log('Admin session: '+request.session.userid);
		response.redirect('/');
	}else{
		next();
	}
});

route.get('/',function(request,response){
	var info = {};
	info.layout = 'layouts/adminlayout';
	info.pagetitle = 'Admin | Home';
	info.dateFormat = dateFormat;
	var adminuserid = request.session.adminuserid;
	console.log('Admin ID: '+adminuserid);

	adminModel.getAdminProfile(adminuserid,function(result){
		if (result.length == 1) {
			admin = result[0];
			info.admin = admin;
			adminModel.getAllUserExceptMe(adminuserid,function(result){
				info.userdata = result;
				response.render('admin/manageruser',info);	
			});
		}	
	});
	
	
});
//This route is for edit user profile
route.get('/edit/:id',function(request,response){
	var id = request.params.id;
	var info = {};
	info.layout = 'layouts/adminlayout';
	info.pagetitle = 'Edit Profile';
	info.admin = admin;
	info.dateFormat = dateFormat;
	userModel.getUser(id,function(result){
		if (result.length == 1) {
			info.user = result[0];
			response.render('admin/edituser',info);
		}
	});
	
});


route.post('/edit/:id',function(request,response){

	var user = {
		name : request.body.name, 
		password : request.body.password,
		id : request.params.id
	}
	//TODO
	//Validation of name and password
	//Empty or some things
	userModel.updateUser(user,function(result){
		if (result) {
			response.redirect('/admin');
		}
	});
});	


//This route is for showing user profile
route.get('/showarticles/:id',function(request,response){
	var info = {};
	info.layout = 'layouts/adminlayout';
	info.pagetitle = 'Show Articles';
	info.admin = admin;
	info.dateFormat = dateFormat;
	userModel.getUser(request.params.id,function(user){
		info.writer = user[0].name;
		info.userid = user[0].user_id;
	});
	var user = {
		userTypeId : 2,
		userId : request.params.id
	}
	userModel.getAllArticle(user,function(result){
		if (result.length > 0) {
			info.articles = result;
		}
		response.render('admin/showarticles',info);
	});
});



//This route will delete the article
route.post('/deletearticle/:url',function(request,response){
	var articleUrl = request.params.url;
	articleModel.getArticle(articleUrl,function(result){
		if (result.length == 1) {
			var articleid = result[0].article_id;
			articleModel.deleteArticle(articleid,function(result){
				if (result) {
					response.send(true);
				}else{
					response.send(false);
				}
			});
		}
	});
	//TODO Delete url
	
});


//This route is for delete user
route.get('/delete/:id',function(request,response){
	var id = request.params.id;
	var info = {};
	info.layout = 'layouts/adminlayout';
	info.pagetitle = 'Delete  User';
	info.admin = admin;
	userModel.getUser(id,function(result){
		if (result.length == 1) {
			info.user = result[0];
			response.render('admin/deleteuser',info);
		}
	});
	
});

route.post('/delete/:id',function(request,response){
	var userid = request.params.id;
	var user = {
		userTypeId : 2,
		userId : userid 
	}
	userModel.getAllArticle(user,function(allArticles){
		for (var i = 0; i < allArticles.length; i++) {
			var articleId = allArticles[i].article_id;
			console.log(allArticles[i].article_id);
			articleModel.deleteArticle(articleId,function(result){
				if (!result) {
					console.log('Error Deleting articles');
				}
			});
		}
		userModel.deleteUser(userid,function(result){
			if (result) {
				response.redirect('/admin');
			}
		});
	});
});

//This route will show admin profile
route.get('/profile',function(request,response){
	var info = {};
	info.layout = 'layouts/adminlayout';
	info.pagetitle = 'Admin | Home';
	info.dateFormat = dateFormat;
	var adminuserid = request.session.adminuserid;
	console.log(adminuserid);
	adminModel.getAdminProfile(adminuserid,function(result){
		if (result.length == 1) {
			info.admin = result[0];
			console.log(info.admin);
			response.render('admin/profile',info);
		}	
	});
	
});

//This route for change the admin password
route.post('/changepassword',function(request,response){
	var password = JSON.parse(request.body.info);
	password.adminid = request.session.adminuserid;
	var admin = {
		password: password.newpass, 
		userid : request.session.adminuserid
	};
	if (password.newpass == password.newrepass) {
		existOldPassword(admin,function(result){
			if (!result) {
				adminModel.checkPassword(password,function(result){
					console.log('Check password: '+result);
					if (result) {
						adminModel.changePassword(password,function(result){
							console.log('Change password: '+result);
							if (result) {
								response.send(true);
							}	
						});
					}else{
						response.send(false);
					}
				});
			}else{
				response.send(false);
			}
		});
		
	}else{
		response.send(false);
	}
	
});

//This route will update the status of the article
route.post('/updatestatus',function(request,response){
	var info = JSON.parse(request.body.information);
	info.status = (info.status == 'active')? 1 : 2;
	console.log(info);
	articleModel.updateUrlStatus(info,function(result){
		response.send(result);
	});
});


route.post('/logout',function(request,response){
	request.session.adminuserid = null;
	response.send(true);
});

module.exports = route;