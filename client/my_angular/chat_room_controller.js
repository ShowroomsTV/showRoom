app.controller('chatRoomController',['$scope', '$routeParams','ShowFactory','UserFactory', function($scope,$routeParams,ShowFactory,UserFactory){
  function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	currentUser();
  
  $(document).ready(function() {
      var socket = io();

      $('#new_message').submit(function(e){
        e.preventDefault();
        socket.emit('chat message', {message: $('#message').val(), name: $('#name').val()});
        $('#message').val('');
        return false;
      });
      socket.on('chat message', function(data){
        var msg = "<p>"+ data.name + ": " + data.message+".</p>";
        $('#text_box').append(msg);
      });
    });

    function getOneShow(name){
      console.log(name)
    ShowFactory.getOneShow(name,function(data){
      console.log("getOne",data)
      $scope.show = data;
      // console.log("one show controller",data);
      var time = $scope.show.schedule.time.split(":")
      $scope.show.schedule.time = new Date(1988,6,4,time[0],time[1]).toLocaleTimeString();
      // $scope.show.summary.
    })
  }
  getOneShow($routeParams.name);
}])
