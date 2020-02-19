const helper = require('../helper');
const {getAllStation, getStationByCityId} = require('../model/station');
const redisClient = require('../config/redis');

module.exports = {
	getStationByCityId : async (request, response) => {
		try {
			const city_id = request.params.city_id;
			const nameParams = request.query.nameParams ? request.query.nameParams : '';
			if(city_id === undefined){
				const result = await getAllStation(nameParams);
				redisClient.setex(`schedules:${JSON.stringify(request.query)}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response,200,result);
			}else{
				const result = await getStationByCityId(city_id);
				redisClient.setex(`schedule:${city_id}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response,200,result);
			}
		} catch (error) {
			return helper.response(response, 400,{message:' Data Does not Exist'});
		}
	},
};