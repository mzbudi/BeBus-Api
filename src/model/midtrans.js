const connection = require('../config/mysql');
const midtransClient = require('midtrans-client');

module.exports = {
	createMidtransTransaction: (booking) => {
		console.log(booking);
        
		return new Promise((resolve, reject) => {
			let snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: 'SB-Mid-server-lA7COBHbLulu9nXRTV86ibWX',
				clientKey: 'SB-Mid-client-Kz-4G2-QbnaVYyVH'
			});
			let parameter = {
				'transaction_details': {
					'order_id': booking.booking_number,
					'gross_amount': booking.schedule_price
				}
			};
			return snap.createTransaction(parameter)
				.then((transaction) => resolve(transaction.redirect_url))
				.catch(error => {
					reject(error);
				});
		});
	},
	postMidtransNotification: (bookingNumber) => {
		return new Promise((resolve, reject) => {
			let snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: 'SB-Mid-server-lA7COBHbLulu9nXRTV86ibWX',
				clientKey: 'SB-Mid-client-Kz-4G2-QbnaVYyVH'
			});
			snap.transaction.notification(request.body)
				.then((statusResponse) => {
					let orderId = statusResponse.order_id;
					let transactionStatus = statusResponse.transaction_status;
					let fraudStatus = statusResponse.fraud_status;

					console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

					// Sample transactionStatus handling logic

					if (transactionStatus == 'capture') {
						if (fraudStatus == 'challenge') {
							// TODO set transaction status on your databaase to 'challenge'
						} else if (fraudStatus == 'accept') {
							// TODO set transaction status on your databaase to 'success'
						}
					} else if (transactionStatus == 'cancel' ||
                        transactionStatus == 'deny' ||
                        transactionStatus == 'expire') {
						// TODO set transaction status on your databaase to 'failure'
					} else if (transactionStatus == 'pending') {
						// TODO set transaction status on your databaase to 'pending' / waiting payment
					}
				});
		});
	}
};
