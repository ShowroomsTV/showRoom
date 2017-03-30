app.controller('showAllController',['$scope', '$routeParams','ShowFactory','UserFactory', function($scope,$routeParams,ShowFactory,UserFactory){
	function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	currentUser();

	$scope.logout = function(user){
		UserFactory.logout(user);
	}

	function getShows(){
		ShowFactory.getShows(function(data){
			// console.log(data);
			$scope.shows = data;
		})
	}
	getShows();
}])
