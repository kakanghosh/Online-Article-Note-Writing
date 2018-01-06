var db = require('./db');
module.exports = {
	createNewUser : function(user,callback){
		var sql = 'INSERT INTO user_table VALUES(null,?,?,?,?,?,?)';
		db.execute(sql,[
			user.username,
			user.fullname,
			user.email,
			user.password,
			user.usertypeid,
			user.createdate],function(result){
			callback(result);
		});
	},
	createNewUserWithID : function(user,callback){
		var sql = 'INSERT INTO user_table VALUES(null,?,?,?,?,?,?)';
		db.executeGetId(sql,[
			user.username,
			user.fullname,
			user.email,
			user.password,
			user.usertypeid,
			user.createdate],function(result){
			callback(result);
		});
	},
	isUsernameExist : function(username,callback){
		var sql = 'SELECT * FROM user_table WHERE user_name = ?';
		db.getResult(sql,[username],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	isEmailExist : function(email,callback){
		var sql = 'SELECT * FROM user_table WHERE email = ?';
		db.getResult(sql,[email],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	saveOldPassword : function(data,callback){
		var sql =  'INSERT INTO old_password_table VALUES(null,?,?,?)';
		db.execute(sql,[data.userid,data.password,data.datetime],function(result){
			callback(result);
		});
	},
	checkOldPassword : function(){

	},
	checkLogin : function(user,callback){
		var sql = 'SELECT * FROM user_table WHERE user_name = ? OR email = ? AND password = ? ';
		db.getResult(sql,[user.email,user.email,user.password],function(result){
			/*if (result.length > 0) {
				callback(true,result[0].user_id);
			}else{
				callback(false,-1);
			}*/
			callback(result);
		});
	}
}