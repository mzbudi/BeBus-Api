const helper = require('../helper/');
const midtransClient = require('midtrans-client');
const redisClient = require('../config/redis');

const { getAllBooking, getBookingById, getBookingByBookingNumber, postBooking, putBooking } = require('../model/booking');
const { createMidtransTransaction } = require('../model/midtrans');

module.exports = {
	postPayment: async (request, response) => {
		try {
			const booking = await getBookingByBookingNumber(request.params.bookingNumber);
			const paymentUrl = await createMidtransTransaction(booking);
			return helper.response(response, 200, {...booking, paymentUrl});
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
	postMidtransNotification: async (request, response) => {
		let snap = new midtransClient.Snap({
			isProduction: false,
			serverKey: process.env.MIDTRANS_SERVERKEY,
			clientKey: process.env.MIDTRANS_CLIENTKEY
		});
		snap.transaction.notification(request.body)
			.then((statusResponse) => {
				let orderId = statusResponse.order_id;
				let transactionStatus = statusResponse.transaction_status;
				let fraudStatus = statusResponse.fraud_status;
				redisClient.del('booking*');
				if (transactionStatus == 'capture') {
					if (fraudStatus == 'challenge') {
						return putBooking(orderId, { booking_status: 'CHALLENGE' });
					} else if (fraudStatus == 'accept') {
						return putBooking(orderId, { booking_status: 'PAID' });
					}
				} else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
					return putBooking(orderId, { booking_status: 'FAILED' });
				} else if (transactionStatus == 'pending') {
					 return putBooking(orderId, { booking_status: 'PENDING' });
				} else if (transactionStatus == 'settlement') {
					return putBooking(orderId, { booking_status: 'PAID' });
				} else {
					return helper.response(response, 400, 'Unknown transaction status');
				}
			})
			.then(() => {
				return helper.response(response, 200, 'OK');
			})
			.catch(error => {
				return helper.response(response, 200, error);
			});
	}
};
