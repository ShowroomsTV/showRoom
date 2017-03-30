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
        $('#message_board').append(msg);
      });
    });
}])
