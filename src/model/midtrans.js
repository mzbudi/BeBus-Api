const midtransClient = require('midtrans-client');

module.exports = {
	createMidtransTransaction: (booking) => {
		return new Promise((resolve, reject) => {
			let snap = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVERKEY,
				clientKey: process.env.MIDTRANS_CLIENTKEY
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
	}
};
