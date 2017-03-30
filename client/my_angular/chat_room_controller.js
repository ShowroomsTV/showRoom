app.controller('chatRoomController',['$scope', '$routeParams','ShowFactory','UserFactory', function($scope,$routeParams,ShowFactory,UserFactory){
  function currentUser(){
		UserFactory.currentUser(function(data){
			$scope.user = data;
		});
	}
	currentUser();
  $(document).ready(function() {
    // var socket = io.connect();
    // var current_user;

    // var new_user = function() {
    //   // var name = prompt("Your name:");
    //   socket.emit("page_load", {user: currentUser()});
    // }

    // new_user();

  //   socket.on("existing_user", function(data){
  //     $("#error").html(data.error)
  //     new_user();
  //   })


  //   socket.on("post_new_name", function(data) {
  //     $("#message_board").append("<p>" + data.user +"</p>");
  //   })
  // })
  $(function () {
    var socket = io();
    $('#new_message').submit(function(){
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#message_board').append($('<li>').text(msg));
    });
  });
})
}])
