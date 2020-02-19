const helper = require('../helper');
const redisClient = require('../config/redis');

module.exports = {
	getCityByIdMiddleware: (request, response, next) => {
		redisClient.get(`city:${request.params.cityId}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	},
	getAllCityMiddleware: (request, response, next) => {
		redisClient.get(`cities:${JSON.stringify(request.query)}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	}
};
