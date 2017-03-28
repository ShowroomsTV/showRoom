app.controller('showUserController',['$scope', '$routeParams','UserFactory', function($scope,$routeParams,UserFactory){
	function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	currentUser();

	$scope.logout = function(user){
		UserFactory.logout(user);
	}
}])