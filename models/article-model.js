var db = require('./db');

module.exports = {
	insertArticle: function(entry,callback){
		var sql = 'INSERT INTO article_table VALUES(null,?,?,?,?,?,?,?)';
		db.execute(sql,[
				entry.url,
				entry.article,
				entry.article_title,
				entry.member_type_id,
				entry.pin,
				entry.status,
				entry.creation_time_date
			],function(result){
			
			callback(result);	
		});
	},
	insertArticleWithID: function(entry,callback){
		var sql = 'INSERT INTO article_table VALUES(null,?,?,?,?,?,?,?)';
		db.executeGetId(sql,[
				entry.url,
				entry.article,
				entry.article_title,
				entry.member_type_id,
				entry.pin,
				entry.status,
				entry.creation_time_date
			],function(result){
			
			callback(result);
		});
	},
	insertArticleInfo:function(data,callback){
		var sql = 'INSERT INTO article_info_table VALUES(null,?,?,?)';
		db.execute(sql,[data.articleid,data.userid,data.datetime],function(result){
			callback(result);
		});
	},
	updateArticle: function(entry,callback){
		var sql = 'UPDATE article_table SET article = ? WHERE url = ?';
		db.execute(sql,[entry.article,entry.url],function(result){
			callback(result);	
		});
	},
	deleteArticle : function(articleid,callback){
		var sql = 'DELETE FROM article_info_table WHERE article_info_table.article_id = ?';
		db.execute(sql,[articleid],function(result){
			if (result) {
				var sql = 'DELETE FROM article_table WHERE article_id = ?';
				db.execute(sql,[articleid],function(result){
					callback(result);
				});
			}else{
				callback(result);
			}
		});
	},
	isUrlExist: function(url,callback){
		var sql = 'SELECT * FROM article_table WHERE url = ?';
		db.getResult(sql,[url],function(result){
			if (result.length == 1) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getArticle: function(url,callback){
		var sql = 'SELECT * FROM article_table WHERE url = ?';
		db.getResult(sql,[url],function(result){
			callback(result);
		});
	},
	updateArticleDateTime : function(obj,callback){
		var sql = 'UPDATE article_info_table SET article_update_date = ? WHERE article_id = ?';
		db.execute(sql,[obj.datetime,obj.articleid],function(res){
			callback(res);
		});
	},
	setUrlPassword: function(obj,callback){
		var sql = 'UPDATE article_table SET pin = ? WHERE url = ?';
		db.execute(sql,[obj.pin,obj.url],function(res){
			callback(res);
		});
	},
	loginToArticle : function(data,callback){
		var sql = 'SELECT * FROM article_table WHERE url = ? AND pin = ?';
		db.getResult(sql,[data.url,data.password],function(result){
			if (result.length == 1) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	checkUrlStatus : function(article,callback){
		var sql = 'SELECT * FROM article_table WHERE url = ? AND article_status_id = ?';
		db.getResult(sql,[article.url,article.status_id],function(result){
			if (result.length > 0) {
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateUrlStatus : function(obj,callback){
		var sql = 'UPDATE article_table SET article_status_id = ? WHERE url = ?';
		db.execute(sql,[obj.status,obj.url],function(res){
			callback(res);
		});
	}
};