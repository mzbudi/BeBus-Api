const helper = require('../helper');
const { getAllSchedule, getScheduleById } = require('../model/schedule');


module.exports = {
	getSchedule: async (request, response) => {
		try {
			const scheduleId = request.params.scheduleId;
			if (scheduleId === undefined) {
				const result = await getAllSchedule(request.query);
				return helper.response(response, 200, result);
			} else {
				const result = await getScheduleById(scheduleId);
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}

};