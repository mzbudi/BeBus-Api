const express = require('express');
const route = express.Router();
const { postPayment, postMidtransNotification } = require('../controller/payment');
const admin = require('firebase-admin');

const test = (request, response, next) => {
	// This registration token comes from the client FCM SDKs.
	var registrationToken = 'YOUR_REGISTRATION_TOKEN';

	var message = {
		data: {
			score: '850',
			time: '2:45'
		},
		token: registrationToken
	};

	// Send a message to the device corresponding to the provided
	// registration token.
	admin.messaging().send(message)
		.then((response) => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response);
		})
		.catch((error) => {
			console.log('Error sending message:', error);
		});
};

route
	.get('/test', test)
	.post('/:bookingNumber(\\d+)', postPayment)
	.post('/midtrans-notification', postMidtransNotification);

module.exports = route;