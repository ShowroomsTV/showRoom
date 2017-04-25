app.factory('ShowFactory', ['$http', '$location', function($http,$location){
	var factory = {};
	factory.getShows = function(callback){
		$http({
			url: '/allShows',
			method: "GET"
		}).then(function(res){
			console.log(res)
			callback(res.data)
		}, function(res){
			console.log(res)
		})
	}
	factory.getOneShow = function(name,callback){
		// console.log("factory",data)
		$http({
			url: '/oneShow/'+ name,
			method: "GET"
		}).then(function(res){
			// console.log("IN THE SHOW FACTORY: ",res)
			callback(res.data)
		}, function(res){
			console.log(res)
		})
	};
	factory.addFav = function(name, callback, show_name){
		// console.log("factory",name)
		$http({
			url:'/show/favorite',
			method: 'POST',
			data: {movie_name: name}
		}).then(function(res){
			console.log(res);
			callback(show_name);
			// $location.url('/');
		}, function(res){
			console.log(res);
		})
	};
	factory.removeFav = function(name, callback, show_name){
		console.log("factory",name)
		$http({
			url:'/show/favorite/remove',
			method: 'POST',
			data: {movie_name: name}
		}).then(function(res){
			console.log(res);
			callback(show_name)
			// $location.url('/');
		}, function(res){
			console.log(res);
		})
	};
	factory.activateNotification = function(name){
		console.log(name + " factory");
		$http({
			url: "/show/twilio",
			method: "POST",
			data: {show_name: name}
		}).then(function(res){
			console.log(res);
		}, function(res){
			console.log(res);
		})
	};
	return factory;
}])
