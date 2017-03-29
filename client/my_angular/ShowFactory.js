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
			console.log(res)
			callback(res.data)
		}, function(res){
			console.log(res)
		})
	}
	return factory;
}])