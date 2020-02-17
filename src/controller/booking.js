const helper = require('../helper/');

const { getAllBooking, getBookingById, getBookingByBookingNumber, postBooking, putBooking } = require('../model/booking');
//const { getMidtransPaymentUrl } = require('../model/midtrans');

module.exports = {
	getBooking: async (request, response) => {
		try {
			
			if (request.params.bookingNumber !== undefined && request.params.bookingNumber !== '') {
				const result = await getBookingByBookingNumber(request.params.bookingNumber);
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
	}
};
