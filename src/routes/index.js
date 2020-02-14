const express = require('express');
const route = express.Router();

const authRoute = require('./auth');
const stationRoute = require('./station');

route.use('/auth', authRoute);
route.use('/station',stationRoute);

module.exports = route;