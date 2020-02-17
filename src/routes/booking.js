const express = require('express');
const route = express.Router();
const midtransClient = require('midtrans-client');
const helper = require('../helper');

const { getBooking, postBooking } = require('../controller/booking');
const { postBookingMiddleware } = require('../middleware/booking');


route
	.get('/', getBooking)
	.get('/:bookingNumber', getBooking)
	.post('/', postBookingMiddleware, postBooking);

module.exports = route;
