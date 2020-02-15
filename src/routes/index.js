const express = require('express');
const route = express.Router();

const authRoute = require('./auth');
const stationRoute = require('./station');
const cityRoute = require('./city');
const userRoute = require('./user');
const scheduleRoute = require('./schedule');
const bookingRoute = require('./schedule');

const { authorization } = require('../middleware/authorization');

route.use('/auth', authRoute);
route.use('/station',stationRoute);
route.use('/city', cityRoute);
route.use('/user', userRoute);
route.use('/schedule', scheduleRoute);
route.use('/booking', bookingRoute);

module.exports = route;