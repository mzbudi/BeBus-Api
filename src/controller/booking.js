const helper = require('../helper/');
const redisClient = require('../config/redis');
const {createMidtransTransaction} = require('../model/midtrans');

const { getAllBooking, getBookingByBookingNumber, getBookingByBookingId, postBooking, putBooking } = require('../model/booking');

module.exports = {
	getBooking: async (request, response) => {
		const user_id = request.query.user_id;
		const bookingNumber = request.params.bookingNumber;
		try {
			if (bookingNumber !== undefined && bookingNumber !== '') {
				const result = await getBookingByBookingNumber(bookingNumber);
				redisClient.setex(`booking:${bookingNumber}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			} else {
				const result = await getAllBooking(user_id);
				redisClient.setex(`bookings:${JSON.stringify(request.query)}`, process.env.REDIS_TTL, JSON.stringify(result));
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}, 
	postBooking: async (request, response) => {
		try {
			const newBooking = await postBooking(request.body);
			const booking = await getBookingByBookingId(newBooking.booking_id);
			const paymentUrl = await createMidtransTransaction(booking);
			booking.paymentUrl = paymentUrl;
			redisClient.del('booking*');
			return helper.response(response, 200, booking);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
