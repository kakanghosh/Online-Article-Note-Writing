var db = require('./db');
module.exports = {
	getAllUser : function(callback){
		var sql = 'SELECT * FROM user_table';
		db.getResult(sql,null,function(result){
			callback(result);
		});
	},
	getAllUserExceptMe : function(adminid,callback){
		var sql = 'SELECT * FROM user_table WHERE user_id <> ?';
		db.getResult(sql,[adminid],function(result){
			callback(result);
		});
	},
	getAdminProfile : function(adminid,callback){
		var sql = 'SELECT * FROM user_table WHERE user_id = ?';
		db.getResult(sql,[adminid],function(result){
			callback(result);
		});
	},
	checkPassword : function(password,callback){
		var sql = 'SELECT * FROM user_table WHERE password = ? AND user_id = ?';
		db.getResult(sql,[password.oldpass,password.adminid],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	changePassword : function(password,callback){
		var sql = 'UPDATE user_table SET password = ? WHERE user_id = ?';
		db.execute(sql,[password.newpass,password.adminid],function(result){
			callback(result);
		});
	},
	existOldPassword : function(user,callback){
		var sql = 'SELECT * FROM old_password_table WHERE old_password = ? AND user_id = ?';
		db.getResult(sql,[user.password, user.userid],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}