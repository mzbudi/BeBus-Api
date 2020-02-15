const express = require('express');
const route = express.Router();

const authRoute = require('./auth');
const stationRoute = require('./station');
const cityRoute = require('./city');
const userRoute = require('./user');

const { authorization } = require('../middleware/authorization');

route.use('/auth', authRoute);
route.use('/station',stationRoute);
route.use('/city', authorization, cityRoute);
route.use('/user', userRoute);

module.exports = route;