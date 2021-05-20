const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});


app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/src/pages/index.html");
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});