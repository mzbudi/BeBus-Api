const helper = require('../helper');
const redisClient = require('../config/redis');

module.exports = {
	getAllBookingMiddleware: (request, response, next) => {
		redisClient.get(`bookings:${JSON.stringify(request.query)}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	},
	getBookingMiddleware: (request, response, next) => {
		redisClient.get(`booking:${request.params.scheduleId}`, (error, reply) => {
			if (!error && reply != null) {
				return helper.response(response, 200, JSON.parse(reply));
			} else {
				next();
			}
		});
	},
	postBookingMiddleware: (request, response, next) => {
		let body = {};

		//Check seat number
		if (request.body.seat_number !== undefined && request.body.seat_number !== '') {
			if (/^[0-9]{1,3}$/.test(request.body.seat_number) == false) {
				helper.response(response, 400, 'Invalid seat number');
			} else {
				body.booking_seat_number = request.body.seat_number;
			}
		} else {
			helper.response(response, 400, 'Seat number cannot be empty');
		}
		//Check booking user id
		if (request.body.user_id !== undefined && request.body.user_id !== '') {
			if (/^[0-9]{1,3}$/.test(request.body.user_id) == false) {
				helper.response(response, 400, 'Invalid user ID');
			} else {
				body.booking_user_id = request.body.user_id;
			}
		} else {
			helper.response(response, 400, 'User ID cannot be empty');
		}
		//Check schedule id
		if (request.body.schedule_id !== undefined && request.body.schedule_id !== '') {
			if (/^[0-9]{1,3}$/.test(request.body.schedule_id) == false) {
				helper.response(response, 400, 'Invalid schedule ID');
			} else {
				body.booking_schedule_id = request.body.schedule_id;
			}
		} else {
			helper.response(response, 400, 'Schedule ID cannot be empty');
		}
		//Generate booking number
		body.booking_number = ((min, max) => Math.floor(Math.random() * (max - min + 1)) + min)(1000000, 9999999);
		request.body = body;
		next();
	}
};
