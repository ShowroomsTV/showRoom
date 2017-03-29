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

	function getOneShow(name){
		ShowFactory.getOneShow(name,function(data){
			console.log("getOne",data)
			$scope.show = data;
		})
	}
	getOneShow($routeParams.name);

	$scope.addFavorite = function(name){
		console.log("controller", name)
		ShowFactory.addFavorite(name);
		getOneShow($routeParams.name);
	}
}])
// if ( show[i]['rating']['average'] > 9) {