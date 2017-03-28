app.controller('showOneController',['$scope', '$routeParams','ShowFactory', 'UserFactory',function($scope,$routeParams,ShowFactory,UserFactory){
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