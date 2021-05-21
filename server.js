const express = require("express");
const app = express();
app.use(express.static("public"));

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var bodyParser = require('body-parser');
var activeUsers = 0;

app.set('views', __dirname + '/src');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/", function(req, res, next) {
  res.render(__dirname + "/src/index.html");
});

io.on("connection", socket => {
  activeUsers++;
  console.log("a user connected");
  console.log("active: ", activeUsers);
  socket.emit('message', activeUsers);

  socket.on("disconnect", function() {
    activeUsers--;
    console.log("a user disconnected");
    console.log("active: ", activeUsers);
  });
});

server.listen(process.env.PORT);
