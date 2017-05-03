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
			console.log("getOne",data)
			$scope.show = data;
			$scope.seasons = [];
			for( var i = 0; i<data._embedded.episodes.length; i++){
					// console.log(data._embedded.episodes[i])

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
.directive('collapseToggler', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
            elem.on('click', function() {
        $(this).siblings('.collapse').toggleClass('in');
          });
    }
  };
})
// a way to create an array of arrays of seasons with each episodes in each season array
// var seasons = [null];

// for(var i = 0; i < arr.length; i++){
// 	if(arr[i].number == 1){
// 		seasions[arr[i].season] = []
// 	}
// 	seasons[arr[i].season].push(arr[i]); 
// }

// seasons = [null, [S1E1, S1E2, object], [S2E1, S2E2, obejct, object], ]

