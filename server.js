const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var activeUsers = 0;

// Set up 'public' folder
app.use(express.static("public"));

// Point / to index.html (could just put index.html in public but leaving for reference)
app.use("/", function(req, res, next) {
  res.sendFile("src/pages/index.html", { root: __dirname });
});

io.on("connection", socket => {
  activeUsers++;
  console.log("a user connected");
  console.log('active: ', activeUsers);
  
  socket.on("disconnect", function() {
    activeUsers--;
    console.log("a user disconnected");
    console.log('active: ', activeUsers);
  });
  
});

server.listen(process.env.PORT);

// // listen for requests :)
// const listener = app.listen(process.env.PORT, () => {
//   console.log("App is listening on port " + listener.address().port);
// });
