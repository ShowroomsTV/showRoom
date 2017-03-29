var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var tvmaze = require("tvmaze-node");
// // Session configuration
var sessionConfig = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 360000000
 }
}

// Use session with our app
app.use(session(sessionConfig));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server= app.listen(6789, function(){
	console.log("Server running")
})
var io = require('socket.io').listen(server);
var users = [];


io.on("connection", function(socket){
	 console.log('a user connected');
    socket.on("chat message", function(data){
      // if(is_user(data.user) === true) {
    //     socket.emit("existing_user", {error: "This user already exits"})
    //   // } else {
    //     // users.push(data.user);
    //     // socket.emit("load_messages", {})
    //   }
    // })

    // socket.on("new_message", function(data){
      // messages.push({name: data.user, message: data.message})
      io.emit("chat message", data)
    })
  })

  app.get("/", function(request, response){
    response.render("index")
  })
