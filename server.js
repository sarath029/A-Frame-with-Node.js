const express = require("express");
const app = express();

const path = require("path");
let userAccessMap = new Map();

app.use(express.static("public"));

app.get("/", (request, response) => {
  let lastAccess = Date.now();
  let activeUserCount = userAccessMap.size
  let params = { activeUserCount: activeUserCount};
  console.log(request)
  request.query.acticeUserCount = activeUserCount
  response.sendFile(__dirname + "/src/pages/index.html", params);
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


const cleanupFrequency = 10 * 1000;    
const cleanupTarget = 60 * 1000;   

setInterval(() => {
    let now = Date.now();
    for (let [id, lastAccess] of userAccessMap.entries()) {
        if (now - lastAccess > cleanupTarget) {
            userAccessMap.delete(id);
        }
    }
    console.log('clear', userAccessMap)
}, cleanupFrequency);
