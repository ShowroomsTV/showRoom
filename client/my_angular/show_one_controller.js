app.controller('showOneController',['$scope', '$routeParams','ShowFactory', 'UserFactory',function($scope,$routeParams,ShowFactory,UserFactory){
	function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.user = data;

			// console.log("show one controller",data)
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

	function getOneShow(name){
		ShowFactory.getOneShow(name,function(data){
			console.log("getOne",data._embedded.episodes)
			$scope.show = data;
			$scope.seasons = [];
			for( var i = 0; i<data._embedded.episodes.length; i++){
					console.log(data._embedded.episodes[i])

				if(data._embedded.episodes[i].season == data._embedded.episodes.season){
					$scope.seasons.push(data._embedded.episodes[i]);
				}
			}
			var time = $scope.show.schedule.time.split(":")
			$scope.show.schedule.time = new Date(1988,6,4,time[0],time[1]).toLocaleTimeString();
		})
	}
	getOneShow($routeParams.name);

	$scope.addFav = function(name){
		// console.log("controller", name)
		ShowFactory.addFav(name, getOneShow, $routeParams.name);
	}
		$scope.removeFav = function(name){
		// console.log("controller", name)
		ShowFactory.removeFav(name, getOneShow, $routeParams.name);
	}

	$scope.activateNotification = function(name){
		console.log("activateNotification triggered", new Date().getTime());
		ShowFactory.activateNotification(name);
		// console.log(name+" show one controller");
	}

}])


