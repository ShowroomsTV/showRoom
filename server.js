var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var tvmaze = require("tvmaze-node");
var twilio = require("twilio")("ACd35c7f94b47c85c402062d4aa60d27dc","ad1281c7ff090a7bde66acdf68965d5a");

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

app.get("/hello", function(req, res){
  twilio.sendMessage({
    to: "+17142139894",
    from: "+16572232861",
    body: "HELLO"
  }, function(err, data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
  });
});

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

var server= app.listen(6789, function(){
	console.log("Server running")
})
var io = require('socket.io').listen(server);

io.on("connection", function(socket){
	 console.log('a user connected');
    socket.on("chat message", function(data){
      io.emit("chat message", {name:data.name, message:data.message})
    })
  })
