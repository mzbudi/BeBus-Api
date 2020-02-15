const helper = require('../helper/');

const { getAllBooking, getBookingById, postBooking } = require('../model/booking');

module.exports = {
	getBooking: async (request, response) => {
		try {
			if (request.params.bookingId !== undefined) {
				const result = await getBookingById(request.params.bookingId);
				return helper.response(response, 200, result);
			} else {
				const result = await getAllBooking();
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}, 
	postBooking: async (request, response) => {
		try {
			const result = await postBooking(request.body);
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
};
