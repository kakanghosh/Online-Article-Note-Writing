var db = require('./db');
module.exports = {
	getAllArticle : function(data,callback){
		var sql = 'SELECT * FROM article_table'+ 
		' INNER JOIN article_info_table ON'+
		' article_table.article_id = article_info_table.article_id'+
		' WHERE article_table.user_type_id = ? AND article_info_table.user_id = ?';
		db.getResult(sql,[data.userTypeId,data.userId],function(result){
			callback(result);
		});		
	},
	getUser : function(userid,callback){
		var sql = 'SELECT * FROM user_table WHERE user_id = ?';
		db.getResult(sql,[userid],function(result){
			callback(result);
		});
	},
	checkPassword : function(password,callback){
		var sql = 'SELECT * FROM user_table WHERE password = ? AND user_id = ?';
		db.getResult(sql,[password.oldpass,password.userid],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	changePassword : function(password,callback){
		var sql = 'UPDATE user_table SET password = ? WHERE user_id = ?';
		db.execute(sql,[password.newpass,password.userid],function(result){
			callback(result);
		});
	},
	deleteUser : function(userid,callback){
		var sql = 'DELETE FROM old_password_table  WHERE user_id = ?';
		db.execute(sql,[userid],function(result){
			if (result) {
				var sql = 'DELETE FROM user_table  WHERE user_id = ?';
				db.execute(sql,[userid],function(result){
					callback(result);
				});
			}else{
				callback(result);
			}
		});
		
	}
	,
	updateUser : function(user,callback){
		var sql = 'UPDATE user_table SET password = ?, name = ? WHERE user_id = ?';
		db.execute(sql,[user.password,user.name,user.id],function(result){
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