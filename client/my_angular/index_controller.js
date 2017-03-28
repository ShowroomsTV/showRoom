
app.controller('indexController',['$scope', '$routeParams','UserFactory', function($scope,$routeParams,UserFactory){
	$scope.register = function(user){
		TopicFactory.register(user);
	}
	$scope.login = function(user){
		TopicFactory.login(user);
	}
	
	$scope.logout = function(user){
		TopicFactory.logout(user);
	}
}])