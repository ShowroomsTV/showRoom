app.controller('showUserController',['$scope', '$routeParams','UserFactory','ShowFactory', function($scope,$routeParams,UserFactory,ShowFactory){
	function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.session_user = data;
		});
	}
	currentUser();
	function getUser(id){
		UserFactory.getUser(id,function(data){
			$scope.user = data;
			// console.log(data)
		});
	}
	getUser($routeParams.id);

	$scope.logout = function(user){
		UserFactory.logout(user);
	}

}])