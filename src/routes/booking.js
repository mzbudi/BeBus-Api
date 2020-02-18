const express = require('express');
const route = express.Router();

const { getBooking, postBooking } = require('../controller/booking');
const { getBookingMiddleware, postBookingMiddleware } = require('../middleware/booking');


route
	.get('/', getBooking)
	.get('/:bookingNumber', getBookingMiddleware, getBooking)
	.post('/', postBookingMiddleware, postBooking);

module.exports = route;
