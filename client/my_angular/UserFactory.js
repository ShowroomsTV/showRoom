app.factory('UserFactory', ['$http', '$location', function($http,$location){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register',
			method: "POST",
			data:user
		}).then(function(res){
			$location.url('/dashboard')
		}, function(res){
			console.log(res)
		})
	}
	factory.currentUser = function(callback){
		$http({
			url: '/current',
			method: "GET"
		}).then(function(res){
			callback(res.data)
		}, function(res){
			$location.url('/')
		})
	}
	factory.login = function(user){
		$http({
			url: '/login',
			method: "POST",
			data:user
		}).then(function(res){
			$location.url('/dashboard')
			console.log(res)
		}, function(res){
			console.log(res)
		})
	}
	factory.logout = function(){
		$http({
			url: '/logout',
			method: "GET"
		}).then(function(res){
			console.log(res)
		}, function(res){
			console.log(res)
		})
	}
}