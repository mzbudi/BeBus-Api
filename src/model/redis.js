const redis = require('redis');
const helper = require('../helper');

const client = redis.createClient();
client.on('connect', function() {
	console.log('Redis client connected');
});

module.exports = {
	cacheLookup: (name) => {
		return new Promise((resolve, reject) => {
			client.get(name, (error, reply) => {
				if(!error)
					resolve(reply);
				else
					reject(error);
			});
		});
	},
	cacheSave: (name, data) => {
		return new Promise((resolve, reject) => {
			client.setex(name, 60, data,(error, reply) => {
				if (!error)
					resolve(reply);
				else
					reject(error);
			});
		});
	}
};
