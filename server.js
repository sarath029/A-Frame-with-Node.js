var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(1111, function(){ console.log("Server Listening"); });
var io = socket(server);


// Set up 'public' folder 
app.use(express.static(path.join(__dirname, 'public')))

// Point / to index.html (could just put index.html in public but leaving for reference)
app.use('/', function(req, res, next){
  res.sendFile('src/pages/index.html', { root : __dirname })
})

// Create new websocket 
io.sockets.on('connection', function (socket) {
  
});
