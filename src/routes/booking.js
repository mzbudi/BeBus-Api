const express = require('express');
const route = express.Router();
const midtransClient = require('midtrans-client');
const helper = require('../helper');

const { getBooking, postBooking } = require('../controller/booking');
const { postBookingMiddleware } = require('../middleware/booking');

const test = (request, response, next) => {
	// Create Snap API instance
	let snap = new midtransClient.Snap({
		isProduction: false,
		serverKey: 'SB-Mid-server-lA7COBHbLulu9nXRTV86ibWX',
		clientKey: 'SB-Mid-client-Kz-4G2-QbnaVYyVH'
	});
	let parameter = {
		'transaction_details': {
			'order_id': 'test-transaction-1',
			'gross_amount': 200000
		}
	};
	snap.createTransaction(parameter)
		.then((transaction) => {
			// transaction redirect_url
			let redirectUrl = transaction.redirect_url;
			console.log('redirectUrl:', redirectUrl);
		});
	return helper.response(response, 200, 'heheheh');

};

route
	.get('/test', test)
	.get('/', getBooking)
	.get('/:bookingId', getBooking)
	.post('/', postBookingMiddleware, postBooking);

module.exports = route;
