const path = require("path");
let userAccessMap = new Map();

const fastify = require("fastify")({
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});


// Our home page route, this pulls from src/pages/index.hbs
fastify.get("/", function(request, reply) {
  let id = request.ip;
  let lastAccess = Date.now();
  userAccessMap.set(id, lastAccess);
  console.log(userAccessMap)
  let params = { userAccessMap: userAccessMap};
  console.log(params)
  reply.view("/src/pages/index.hbs", params);

});

const cleanupFrequency = 10 * 1000;    
const cleanupTarget = 10* 1000;   

setInterval(() => {
    let now = Date.now();
    for (let [id, lastAccess] of userAccessMap.entries()) {
        if (now - lastAccess > cleanupTarget) {
            userAccessMap.delete(id);
        }
    }
}, cleanupFrequency);


// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
