app.controller('indexController',['$scope', '$routeParams','UserFactory', function($scope,$routeParams,UserFactory){
	$scope.register = function(user){
		console.log("controller",user);
		UserFactory.register(user);
	}
	$scope.login = function(user){
		UserFactory.login(user);
	}
}])