var express = require('express');
var route = express.Router();
var userModel = require.main.require('./models/user-model');
var articleModel = require.main.require('./models/article-model');
var dateFormat = require('dateformat');

route.all('*',function(request,response,next){
	if (request.session.userid == null || typeof request.session.userid == 'undefined') {
		console.log('User session: '+request.session.userid);
		response.redirect('/');
	}else{
		next();
	}
});

route.get('/',function(request,response){
	response.redirect('/us/alllinks');
});

route.get('/alllinks',function(request,response){
	var info = {};
	info.layout = 'layouts/userlayout';
	info.pagetitle = 'Article | All Article';
	info.dateFormat = dateFormat;
	var data = {};
	data.userTypeId = 2;
	data.userId = request.session.userid;
	userModel.getUser(data.userId,function(result){
		if (result.length == 1) {
			info.user = result[0];
			userModel.getAllArticle(data,function(result){
				if (result.length > 0) {
					console.log(result);
					info.articles = result;
				}
				response.render('user/allarticles',info);
			});	
		}
	});
});
/*
route.get('/article_request',function(request,response){
	var info = {};
	info.layout = 'layouts/userlayout';
	response.render('user/articlerequest',info);
});*/

//This route will update the status of the article
route.post('/updatestatus',function(request,response){
	var info = JSON.parse(request.body.information);
	info.status = (info.status == 'active')? 1 : 2;
	console.log(info);
	articleModel.updateUrlStatus(info,function(result){
		response.send(result);
	});
});

route.get('/profile',function(request,response){
	var info = {};
	info.layout = 'layouts/userlayout';
	info.dateFormat = dateFormat;
	userModel.getUser(request.session.userid,function(result){
		if (result.length == 1) {
			info.user = result[0];
			response.render('user/profile',info);
		}
	});
});

//This route for change the user password
route.post('/changepassword',function(request,response){
	var password = JSON.parse(request.body.info);
	password.userid = request.session.userid;

	var user = {
		password:password.newpass, 
		userid : request.session.userid
	};
	if (password.newpass == password.newrepass) {
		user.existOldPassword(user,function(result){
			//not exist old password
			if (!result) {
				userModel.checkPassword(password,function(result){
					console.log('Check password: '+result);
					if (result) {
						userModel.changePassword(password,function(result){
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

//This route for logout 
route.post('/logout',function(request,response){
	request.session.userid = null;
	response.send(true);
});




module.exports = route;