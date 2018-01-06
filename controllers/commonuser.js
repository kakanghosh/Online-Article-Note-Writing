var express = require('express');
var route = express.Router();
var articleModel = require.main.require('./models/article-model');
var dateFormat = require('dateformat');
var now = new Date();
//This function will create a random URL
function makeUrl(len){
	var domain = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var url = '';
  	for (var i = 0; i < len; i++)
    	url += domain.charAt(Math.floor(Math.random() * domain.length));

  	return url;
}

//This function for finding the existing of URL when someone tries to access the logged URL
function findURlAuth(dataset,url){
	for (var i = 0; i < dataset.length; i++) {
		if (dataset[i] == url) {
			return true;
		}
	}
	return false;
}

//This function for logout from URL and remove the URL from session
function removeURlAuth(dataset,url){
	for (var i = 0; i < dataset.length; i++) {
		if (dataset[i] == url) {
			dataset[i] = 'undefined';
			break;
		}
	}
}

/*route.all('/:url',function(request,response,next){
	//TODO
	//Check for the status of the URL
	articleModel.checkUrlStatus({url : request.params.url,status_id : 1},function(status){
		if (status) {
			next();
		}else{
			console.log('called');
			response.redirect('/');
		}
	});
});
*/

//This route will create an new url
route.get('/',function(request,response){
	var url = makeUrl(5);
	if (url == 'undefined') {
		response.redirect('/');
	}
	articleModel.isUrlExist(url,function(result){
		if (result) {
			response.redirect('/');
		}else{
			response.redirect('/'+url);
		}
	});
	
});


//This route for showing an article with url
route.get('/:url',function(request,response){
	var dt = request.params.url;
	if (dt == 'undefined') {
		response.redirect('/');
	}


	//Creating URL Auth Array for the first time 
	//This array will keep the URL which are logged in
	if (typeof request.session.urlauth == 'undefined') {
		request.session.urlauth = [];
	}
	
	var info = {};
	
	info.pinExist = function(p){
						if (p.length > 0) {
							return true;
						}
						return false;
					};
	if (request.session.newUserMsg != null) {
		info.newuser = request.session.newUserMsg;
		request.session.newUserMsg = null;
	}
	if (request.session.loginfailed != null) {
		info.loginfailed = "Login Failed";
		request.session.loginfailed = null;
	}

	articleModel.isUrlExist(dt,function(result){
		if (result) {
			//If URL status is active
			articleModel.checkUrlStatus({url : request.params.url,status_id : 1},function(status){
				if (status) {
					console.log('URL is Active');
					//If url is exist
					articleModel.getArticle(dt,function(res){
						info.data = dt;
						info.article = res[0].article;
						info.pin =  res[0].pin;
						info.layout = 'layouts/layout';
						info.session = request.session;
						console.log(info.pinExist(info.pin));
						if (info.pinExist(info.pin) &&  !findURlAuth(request.session.urlauth,dt)) {
							response.redirect('/login/'+dt);
						}else{
							
							response.render('article/index',info);
						}
					});
				}else{
					console.log('URL is not Active');
					response.redirect('/');
				}
			});
			
		}else{
			//If url is not exist
			info.data = dt;
			info.article = ''; 
			info.pin = '';
			info.layout = 'layouts/layout';
			info.session = request.session;
			response.render('article/index',info);
		}
	});
});

//This route will check for the password of the URL
route.get('/login/:url',function(request,response){
	var info = {};
	info.layout = 'layouts/layout';
	info.pagetitle = 'Login';
	response.render('article/articlelogin',info);
});

route.post('/login/:url',function(request,response){
	var info = {};
	info.layout = 'layouts/layout';
	info.pagetitle = 'Login';
	var data = {};
	data.url = request.params.url;
	data.password = request.body.password;
	articleModel.loginToArticle(data,function(result){
		if (result) {
			request.session.urlauth.push(request.params.url);
			response.redirect('/'+data.url);
		}else{
			info.error = 'Wrong Password';
			response.render('article/articlelogin',info);		
		}
	}); 
});

//This will logout from Logged URL
route.post('/logout/:url',function(request,response){
	removeURlAuth(request.session.urlauth,request.params.url);
	response.send(true);
});


//this will handle by AJAX
route.post('/insert/:url',function(request,response){
	var obj = JSON.parse(request.body.information);
	var artUrl = request.params.url;
	articleModel.isUrlExist(artUrl,function(res){
		if (res) {
			//TODO
			//Update article in url
			var newObj = {
				url:artUrl,
				article: obj.message
			};
			articleModel.updateArticle(newObj,function(res){
				if (res) {
					articleModel.getArticle(artUrl,function(article){
						if (article.length == 1) {
							var upInfo = {
								datetime : new Date(),
								articleid : article[0].article_id
							};
							articleModel.updateArticleDateTime(upInfo,function(result){
								if (result) {
									console.log('Update Successful');
								}else{
									console.log('Update error');
								}
							});
						}else{
							console.log('Update error');
						}
					});
				}else{
					console.log('Update error');
				}
			});
		}else{
			//TODO
			//Inseting new article
			var newObj = {
				url: artUrl,
				article: obj.message,
				article_title: obj.title,
				pin: '',
				status : 1,
				creation_time_date: new Date() 
			};
			console.log('I am logged: '+request.session.userid);
			if (request.session.userid != null) {
				newObj.member_type_id = 2;
				articleModel.insertArticleWithID(newObj,function(res){
					console.log(res);
					if (res != -1) {
						var articleInfo = {};
						articleInfo.articleid = res;
						articleInfo.userid = request.session.userid;
						articleInfo.datetime = new Date();
						articleModel.insertArticleInfo(articleInfo,function(result){
							if (result) {
								console.log('Insert Successful');		
							}
						}); 
					}else{
						console.log('Insert Error');
					}
				});
			}else{
				newObj.member_type_id = 3;
				articleModel.insertArticle(newObj,function(res){
					if (res) {
						console.log('Insert Successful');
					}else{
						console.log('Insert Error');
					}
				});
			}
			//console.log(newObj);
		}
	});
	response.send(obj);
});


//This route is for set password to a url
route.post('/setpassword/:password',function(request,response){
	var flag = false;
	var pass = request.params.password;
	var url = request.body.url;
	var obj = {};
	obj.pin = pass;
	obj.url = url;
	articleModel.isUrlExist(url,function(res){
		if (res) {
			articleModel.setUrlPassword(obj,function(result){
				if (result) {
					console.log('Password set');
					flag = true;
					response.send(flag);
				}
			});
		}
	});
	console.log(pass+'  '+url);
	
});

//This route is for reset password to a url
route.post('/resetpassword/:url',function(request,response){
	var url = request.params.url;
	articleModel.isUrlExist(url,function(result){
		if (result) {
			var obj = {};
			obj.pin = '';
			obj.url = url;
			articleModel.setUrlPassword(obj,function(result){
				response.send(result);
			});
		}
	});
});

//This route will fetch the article data called by AJAX
route.post('/getarticle/:url',function(request,response){
	var url = request.params.url;
	articleModel.isUrlExist(url,function(result){
		if (result) {
			articleModel.getArticle(url,function(result){
				response.send(result[0].article);
			});
		}else{
			response.send('');
		}
	});
});


module.exports = route;