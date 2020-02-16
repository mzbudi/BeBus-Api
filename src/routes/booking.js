const express = require('express');
const route = express.Router();
const midtransClient = require('midtrans-client');
const helper = require('../helper');

const { getBooking, postBooking, postMidtransNotification } = require('../controller/booking');
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
			'order_id': 'test-transaction-5',
			'gross_amount': 200000
		}
	};
	snap.createTransaction(parameter)
		.then((transaction) => {
			// transaction redirect_url
			let redirectUrl = transaction.redirect_url;
			return helper.response(response, 200, redirectUrl);
		});

};


const test2 = (request, response, next) => {
	console.log('----------');
	console.log(request.body);
	console.log('----------');
};

const test3 = (request, response) => {
	console.log('hhhhhhhh');
	
	// Create Snap API instance
	let snap = new midtransClient.Snap({
		isProduction: false,
		serverKey: 'SB-Mid-server-lA7COBHbLulu9nXRTV86ibWX',
		clientKey: 'SB-Mid-client-Kz-4G2-QbnaVYyVH'
	});
	snap.transaction.status('test-transaction-4')
		.then((response) => {
			console.log('+++++++++++');
			console.log(response);
			console.log('+++++++++++');
			return helper.response(response, 200, 'hehehe');
		});
	return response.json({});
};

route
	.get('/test', test)
	.post('/test2', test2)
	.get('/test3', test3)
	.get('/', getBooking)
	.get('/:bookingId', getBooking)
	.post('/', postBookingMiddleware, postBooking)
	.post('/midtransNotification', postMidtransNotification);

module.exports = route;
