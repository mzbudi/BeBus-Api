const helper = require('../helper/');

const { getAllBooking, getBookingById, getBookingByBookingNumber, postBooking, putBooking } = require('../model/booking');
const { createMidtransTransaction } = require('../model/midtrans');

module.exports = {
	getPaymentStatus: async (request, response) => {
		try {
			const booking = await getBookingByBookingNumber(request.params.bookingNumber);
			const paymentUrl = await createMidtransTransaction(booking);
			return helper.response(response, 200, { ...booking, paymentUrl });
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
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
			serverKey: 'SB-Mid-server-lA7COBHbLulu9nXRTV86ibWX',
			clientKey: 'SB-Mid-client-Kz-4G2-QbnaVYyVH'
		});
		const booking = await snap.transaction.notification(request.body)
			.then((statusResponse) => {
				let orderId = statusResponse.order_id;
				let transactionStatus = statusResponse.transaction_status;
				let fraudStatus = statusResponse.fraud_status;
				if (transactionStatus == 'capture') {
					if (fraudStatus == 'challenge') {
						// TODO set transaction status on your databaase to 'challenge'
						return putBooking(request.body.order_id, { booking_status: 'CHALLENGE' });
					} else if (fraudStatus == 'accept') {
						// TODO set transaction status on your databaase to 'success'
						return  putBooking(request.body.order_id, { booking_status: 'PAID' });
					}
				} else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire') {
					// TODO set transaction status on your databaase to 'failure'
					return putBooking(request.body.order_id, { booking_status: 'FAILED' });
				} else if (transactionStatus == 'pending') {
					// TODO set transaction status on your databaase to 'pending' / waiting payment
					return putBooking(request.body.order_id, { booking_status: 'PENDING' });
				}
				return helper.response(response, 200, 'OK');
			});
	}
	// postMidtransNotification: async (request, response) => {
	// 	try {
	// 		if (request.body.status_code < 300) {
	// 			switch (request.body.transaction_status) {
	// 			//capture, settlement, pending, cancel, expired
	// 			case 'pending':
	// 				await putBooking(request.body.order_id, { booking_status: 'PENDING' });
	// 				break;
	// 			case 'settlement':
	// 				await putBooking(request.body.order_id, { booking_status: 'PAID' });
	// 				break;
	// 			case 'expired':
	// 				await putBooking(request.body.order_id, { booking_status: 'EXPIRED' });
	// 				break;
	// 			case 'cancel':
	// 				await putBooking(request.body.order_id, { booking_status: 'CANCELED' });
	// 				break;
	// 			}
	// 			return helper.response(response, 200, 'OK');
	// 		}
	// 	} catch (error) {
	// 		return helper.response(response, 400, error);
	// 	}
	// }
};
