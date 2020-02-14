const express = require('express');
const route = express.Router();

const authRoute = require('./auth');

route.use('/auth', authRoute);

module.exports = route;