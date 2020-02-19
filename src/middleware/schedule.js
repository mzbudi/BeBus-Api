const helper = require('../helper');
const redisClient = require('../config/redis');

module.exports = {
	getScheduleByIdMiddleware: (request, response, next) => {
		redisClient.get(`schedule:${request.params.scheduleId}`, (error, reply) => {
			if(!error && reply != null){
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	},
	getAllScheduleMiddleware: (request, response, next) => {
		redisClient.get(`schedules:${JSON.stringify(request.query)}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
		//Check date valid?
		if (request.query.date !== undefined && request.query.date !== '') {
			if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(request.query.date) == false) {
				return helper.response(response, 400, 'Invalid date query');
			}
		}
		//Check departureCity & departureStation valid?
		if (request.query.departureCity !== undefined && request.query.departureCity !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.departureCity) == false) {
				return helper.response(response, 400, 'Invalid departureCity query');
			}
		} else if (request.query.departureStation !== undefined && request.query.departureStation !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.departureStation) == false) {
				return helper.response(response, 400, 'Invalid departureStation query');
			}
		}
		if (request.query.departureCity !== undefined && request.query.departureStation !== undefined){
			return helper.response(response, 400, 'departureCity and departureStation should not co-exist in query');
		}
		//Check arrivalCity & arrivalStation valid?
		if (request.query.arrivalCity !== undefined & request.query.arrivalCity !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.arrivalCity) == false) {
				return helper.response(response, 400, 'Invalid arrivalCity query');
			}
		} else if(request.query.arrivalStation !== undefined && request.query.arrivalStation !=='') {
			if (/^[0-9]{1,9}$/.test(request.query.arrivalStation) == false) {
				return helper.response(response, 400, 'Invalid arrivalStation query');
			}
		}
		if (request.query.arrivalCity !== undefined && request.query.arrivalStation !== undefined) {
			return helper.response(response, 400, 'arrivalCity and arrivalStation should not co-exist in query');
		}
		//Check minAvailableSeats
		if (request.query.minAvailableSeats !== undefined && request.query.minAvailableSeats !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.minAvailableSeats) == false) {
				return helper.response(response, 400, 'Invalid minAvailableSeats query');
			}
		}
		//check minPrice
		if (request.query.minPrice !== undefined && request.query.minPrice !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.minPrice) == false) {
				return helper.response(response, 400, 'Invalid minPrice query');
			}
		}
		//check maxPrice
		if (request.query.maxPrice !== undefined && request.query.maxPrice !== '') {
			if (/^[0-9]{1,9}$/.test(request.query.maxPrice) == false) {
				return helper.response(response, 400, 'Invalid maxPrice query');
			}
		}
		//check minDepartureTime
		if (request.query.minDepartureTime !== undefined && request.query.minDepartureTime !== '') {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.minDepartureTime) == false) {
				return helper.response(response, 400, 'Invalid minDepartureTime query');
			}
		}
		//check maxDepartureTime
		if (request.query.maxDepartureTime !== undefined && request.query.maxDepartureTime !== '') {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.maxDepartureTime) == false) {
				return helper.response(response, 400, 'Invalid maxDepartureTime query');
			}
		}
		//check minArrivalTime
		if (request.query.minArrivalTime !== undefined && request.query.minArrivalTime !== '') {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.minArrivalTime) == false) {
				return helper.response(response, 400, 'Invalid minArrivalTime query');
			}
		}
		//check maxArrivalTime
		if (request.query.maxArrivalTime !== undefined && request.query.maxArrivalTime !== '') {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.maxArrivalTime) == false) {
				return helper.response(response, 400, 'Invalid maxArrivalTime query');
			}
		}
		next();
	}
};
