const express = require('express');
const route = express.Router();

const { getSchedule } = require('../controller/schedule');


route
	.get('/', getSchedule)
	.get('/:scheduleId', getSchedule);

module.exports = route;
