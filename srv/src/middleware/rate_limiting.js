const rateLimit = require('express-rate-limit')
const RedisStore = require('rate-limit-redis');
const redis = require('redis')

module.exports  = function() {
    const redisClient = redis.createClient(6379, '127.0.0.1');
    // add rate limiting middleware
    const limiter = rateLimit({
      store: new RedisStore({
          // Configuration @https://github.com/wyattjoh/rate-limit-redis#configuration
          // expiry: 60
          client: redisClient
      }),
      // milliseconds to keep records of requests in memory in minutes
      windowMs: 5 * 60 * 1000,
      max: 100 // limit each IP to 100 requests per windowMs
    });
  
    return limiter
}