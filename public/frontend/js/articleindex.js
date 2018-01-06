$(document).ready(function(){
		//This method is saving the article value in the database
		$('#articletextarea').keyup(function() {
			var article = $('#articletextarea').val()
			console.clear();
			console.log(article);
			var articleUrl = $('#url').val();
			var info = {};
			info.title = 'test';
			info.message = article;
			$.ajax({
				type:'POST',
				data: {information: JSON.stringify(info) },
    			dataType: "json",
				url: '/insert/'+articleUrl,
				success:function(result){//;2
					console.log(result.title);
					console.log(result.message);
				},
				failure: function(errMsg) {
        			console.log(errMsg);
    			}
			});
		});

		//This method will setup the password for the URL
		$('#setpassword').on('click',function(){
			
			var password = $('#password').val();
			var articleUrl = $('#url').val();
			var passwordSetFLag = false;
			if (password.length > 0) {
				console.log(password);
				$.ajax({
				type:'POST',
				data: {url:articleUrl},
				url: '/setpassword/'+password,
				success:function(result){
					if (result) {
						window.location.href = '/'+articleUrl;
					}else{
					}
				},
				failure: function(errMsg) {
    			}
			});
			}else{
				console.log('Empty');
			}
			$('#password').val('');
			$('#logModal').modal('toggle');
		});

		//This method will reset the article password
		$('#resetpassword').on('click',function(){
			var articleUrl = $('#url').val();
			$.ajax({
				type:'POST',
				url: '/resetpassword/'+articleUrl,
				success:function(result){
					if (result) {
						window.location.href = '/'+articleUrl;
					}else{
					}
				},
				failure: function(errMsg) {
    			}
			});
			$('#logModal').modal('toggle');
		});

		//This function will clear the input field of password field
		$('#close').on('click',function(){
			$('#password').val('');
		});
		//This will close the logModal
		$('#disclose').on('click',function(){
			$('#logModal').modal('toggle');
		});

		//This function will continously grabing the article data with AJAX
		function grabArticle(){
			var articleUrl = $('#url').val();
			$.ajax({
				type:'POST',
				url: '/getarticle/'+articleUrl,
				success:function(result){
					console.log(result);
					$('#articletextarea').val(result);
				},
				failure: function(errMsg) {
        			console.log(errMsg);
    			}
			});
		}
		setInterval(grabArticle,2000);

		//This method will logout from the article and get back to article login page
		$('#logout').on('click',function(){
			var articleUrl = $('#url').val();
			$.ajax({
				type:'POST',
				url: '/logout/'+articleUrl,
				success:function(result){
					if (result) {
						window.location.href = '/login/'+articleUrl;
					}
				},
				failure: function(errMsg) {
    			}
			});
		});

});