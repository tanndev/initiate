const crypto = require('crypto');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

// Generate a random session secret
const sessionSecret = crypto.randomBytes(32).toString('hex');

/** Default settings for session middleware. */
const sessionConfig = {
  name: "TannDev Initiate",
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  unset: 'destroy'
};

// Set up the middleware.
const redisClient = redis.createClient({url: process.env.REDIS_URL});
const memorySessionMiddleware = session({...sessionConfig});
const redisSessionMiddleware = session({store: new RedisStore({client: redisClient}), ...sessionConfig});
let currentMiddleware = memorySessionMiddleware;

// Switch between middleware on Redis client events.
redisClient.on('ready', () => {
  console.log('Using Redis for session storage.');
  currentMiddleware = redisSessionMiddleware;
});
redisClient.on('end', () => {
  console.error("Redis disconnected. Falling back to MemoryStore for session storage.");
  currentMiddleware = memorySessionMiddleware;
});
redisClient.on('error', error => {
  if (error.code === 'ECONNREFUSED') {
    // Ignore connection refused errors, as these are common when no redis service is available.
  }
  else {
    console.error("Redis service encountered an error.");
    console.error(error);
  }
  currentMiddleware = memorySessionMiddleware;
});

// Export a wrapper around the session middleware.
module.exports = (req, res, next) => {
  currentMiddleware(req, res, next);
};
