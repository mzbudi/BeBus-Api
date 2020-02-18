const helper = require('../helper/');
const redisClient = require('../config/redis');

const { getAllBooking, getBookingByBookingNumber, postBooking, putBooking } = require('../model/booking');

module.exports = {
	getBooking: async (request, response) => {
		const bookingNumber = request.params.bookingNumber;
		try {
			if (bookingNumber !== undefined && bookingNumber !== '') {
				const result = await getBookingByBookingNumber(bookingNumber);
				redisClient.setex(`booking:${bookingNumber}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			} else {
				const result = await getAllBooking();
				redisClient.setex(`cities:${JSON.stringify(request.query)}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}, 
	postBooking: async (request, response) => {
		try {
			const result = await postBooking(request.body);
			redisClient.del('booking*');
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
