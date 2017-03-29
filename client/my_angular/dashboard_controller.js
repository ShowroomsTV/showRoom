app.controller('dashboardController',['$scope', '$routeParams','UserFactory','ShowFactory', function($scope,$routeParams,UserFactory,ShowFactory){
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