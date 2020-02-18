const helper = require('../helper');
const { getAllSchedule, getScheduleById } = require('../model/schedule');
const redisClient = require('../config/redis');

module.exports = {
	getSchedule: async (request, response) => {
		try {
			const scheduleId = request.params.scheduleId;
			if (scheduleId === undefined) {
				const result = await getAllSchedule(request.query);
				redisClient.setex(`schedules:${JSON.stringify(request.query)}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			} else {
				const result = await getScheduleById(scheduleId);
				redisClient.setex(`schedule:${request.params.scheduleId}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}

};