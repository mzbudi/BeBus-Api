const express = require('express');
const route = express.Router();

const authRoute = require('./auth');
const stationRoute = require('./station');
const cityRoute = require('./city');

route.use('/auth', authRoute);
route.use('/station',stationRoute);
route.use('/city', cityRoute);

module.exports = route;