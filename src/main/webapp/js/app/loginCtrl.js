'use strict';

function LoginCtrl($scope, $routeParams, $http, $location) {
	
	$scope.initUserMenu = function(){
		$http.get('rest/user/whoami')
		.success(function(username, status, headers, config){
			if(username!='anonymousUser'){
				console.info("You're already logged in, welcome "+username);
				jQuery('#userInfoUsername').html('Welcome '+username);
				jQuery('#navItemRightLogin').hide();
				jQuery('#navItemRightUser').show();
				$location.path('/map');
			}
		});
	};
	
	$scope.login = function(){
		var data = "j_username="+$scope.username+"&j_password="+$scope.password+"&submit=Login";
		$http.post('j_spring_security_check', data, {
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'X-Ajax-call':true
			  }
		}).
	    success(function(data, status, headers, config) {
	    	console.info("You're now logged in, welcome "+$scope.username);
	    	jQuery('#userLogin').hide();
			jQuery('#userInfo').show();
	    }).
	    error(function(data, status, headers, config){
	    	console.warn('This is a wrong username or/and a wrong password. Try again');
	    	jQuery('#loginAlert').html("Wrong username or password !");
	    	jQuery('#loginAlert').show();
	    	setTimeout(function(){jQuery('#loginAlert').hide();},4000);
	    });
	};
	
	$scope.logout = function(){
		$http.get('j_spring_security_logout')
		.success(function(data, status, headers, config){
			console.info('logged out');
			jQuery('#userLogin').show();
			jQuery('#userInfo').hide();
		});
	};
}