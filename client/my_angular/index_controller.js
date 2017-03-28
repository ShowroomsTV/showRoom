
app.controller('indexController',['$scope', '$routeParams','UserFactory', function($scope,$routeParams,UserFactory){
	$scope.register = function(user){
		UserFactory.register(user);
	}
	$scope.login = function(user){
		UserFactory.login(user);
	}
	
	$scope.logout = function(user){
		UserFactory.logout(user);
	}
}])