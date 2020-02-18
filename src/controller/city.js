const helper = require('../helper/');
const {getAllCity, getCityById} = require('../model/city');
const redisClient = require('../config/redis');

module.exports = {
	getCity: async (request, response) => {
		const cityId = request.params.cityId;
		try {
			if (cityId !== undefined && cityId !== ''){
				const result = await getCityById(cityId);
				redisClient.setex(`city:${cityId}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			} else {
				const result = await getAllCity();
				redisClient.setex(`cities:${JSON.stringify(request.query)}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
