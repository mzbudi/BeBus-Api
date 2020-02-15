const express = require('express');
const route = express.Router();

const { getBooking, postBooking } = require('../controller/booking');
const { postBookingMiddleware } = require('../middleware/booking');


route
	.get('/', getBooking)
	.get('/:bookingId', getBooking)
	.post('/', postBookingMiddleware, postBooking);

module.exports = route;
