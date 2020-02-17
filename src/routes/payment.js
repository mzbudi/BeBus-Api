const express = require('express');
const route = express.Router();

const { postPayment, postMidtransNotification } = require('../controller/payment');


route
	.post('/:bookingNumber(\\d+)', postPayment)
	.post('/midtransNotification', postMidtransNotification);

module.exports = route;