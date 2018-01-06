var mysql = require('mysql');
var connObj = {
	host: '127.0.0.1',
	user:'root',
	password:'5061',
	database:'article_database'
};
var connection = mysql.createConnection(connObj);
connection.connect(function(err){
	if (err) {
		console.log('Error Connecting: '+err.stack);
		return;
	}else{
		console.log('Connection succesful.');
	}
});

module.exports = {
	getResult: function(sql,params,callback){
		if (params == null) {
			connection.query(sql,function(err,result){
				if (err) {
					console.log(err.stack);
					callback([]);
				}else{
					callback(result);
				}
			});
		}else{
			connection.query(sql,params,function(err,result){
				if (err) {
					console.log(err.stack);
					callback([]);
				}else{
					callback(result);
				}
			});
		}
	},
	execute: function(sql,params,callback){
		if (params == null) {
			connection.query(sql,function(err,result){
				if (err) {
					console.log(err.stack);
					callback(false);
				}else{
					callback(true);
				}
			});
		}else{
			connection.query(sql,params,function(err,result){
				if (err) {
					console.log(err.stack);
					callback(false);
				}else{
					callback(true);
				}
			});
		}
	},
	executeGetId: function(sql,params,callback){
		if (params == null) {
			connection.query(sql,function(err,result){
				if (err) {
					console.log(err.stack);
					callback(-1);
				}else{
					callback(result.insertId);
				}
			});
		}else{
			connection.query(sql,params,function(err,result){
				if (err) {
					console.log(err.stack);
					callback(-1);
				}else{
					callback(result.insertId);
				}
			});
		}
	}
};
