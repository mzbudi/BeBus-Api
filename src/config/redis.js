const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('connect', function () {
	console.log('Redis client connected');
});

module.exports = redisClient;