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

// load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// Our home page route, this pulls from src/pages/index.hbs
fastify.get("/", function(request, reply) {
  let id = request.ip;
  let lastAccess = Date.now();
  userAccessMap.set(id, lastAccess);
  
  let params = { userAccessMap:userAccessMap };
  if (request.query.randomize) {
    // we need to load our color data file, pick one at random, and add it to the params
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];
    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo
    };
  }
  reply.view("/src/pages/index.hbs", params);
});

const cleanupFrequency = 30 * 1000;    
const cleanupTarget = 24 * 60 * 1000;   // clean out users who haven't been here in the last day

setInterval(() => {
    let now = Date.now();
    for (let [id, lastAccess] of userAccessMap.entries()) {
        if (now - lastAccess > cleanupTarget) {
            // delete users who haven't been here in a long time
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
