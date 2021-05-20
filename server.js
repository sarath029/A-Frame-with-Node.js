const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.path("/admin");

var bodyParser = require('body-parser');
var activeUsers = 0;

app.set('views', __dirname + '/src/pages');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", function(req, res, next) {
  res.render(__dirname + "/src/pages/index.ejs", { activeUsers: activeUsers });
});

io.on("connection", socket => {
  activeUsers++;
  console.log("a user connected");
  console.log("active: ", activeUsers);

  socket.on("disconnect", function() {
    activeUsers--;
    console.log("a user disconnected");
    console.log("active: ", activeUsers);
  });
});

server.listen(process.env.PORT);
