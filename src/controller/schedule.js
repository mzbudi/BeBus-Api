const helper = require('../helper');
const { getAllSchedule, getScheduleById } = require('../model/schedule');
//const redisClient = require('../config/redis');

module.exports = {
	getSchedule: async (request, response) => {
		try {
			const scheduleId = request.params.scheduleId;
			if (scheduleId === undefined) {
				const result = await getAllSchedule(request.query);
				return helper.response(response, 200, result);
			} else {
				// const result = await new Promise((resolve, reject) => {
				// 	redisClient.get(
				// 		'sched:'+scheduleId, (error, re							> {
				// 		i								or) {
				// 			console.lo								E ADA');
				// 			resolve(J							rse(reply)									// 		} else {
				// 			getScheduleById(schedule									((schedule) => {
				// 				cons									'CACHE TIDAK ADA');
				console.log(schedule);
				// 				redisClient.setex('sched:'+scheduleId, 10, JSON.stri									hedule), (error, rep												/							res						schedule);
				// 			});
				// 		}
				// 	});
				// });
				// return helper.response(response, 200, result);
				const result = await getScheduleById(scheduleId);
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}

};