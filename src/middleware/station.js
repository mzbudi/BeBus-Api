const helper = require('../helper');
const redisClient = require('../config/redis');

module.exports = {
	getStationByCityIdMiddleware: (request, response, next) => {
		redisClient.get(`station:${request.params.cityId}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	},
	getAllStationMiddleware: (request, response, next) => {
		redisClient.get(`stations:${JSON.stringify(request.query)}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	}
};
