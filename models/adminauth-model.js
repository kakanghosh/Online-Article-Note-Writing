var db = require('./db');
module.exports = {
	chechAdminLogin : function(admin,callback){
		var sql = "SELECT * FROM user_table WHERE (user_name = ? OR email = ?) AND user_type_id = ? AND "+
		"password = ?";
		db.getResult(sql,[admin.username,admin.username,admin.typeid,admin.password],function(result){
			callback(result);
		});
	}
}