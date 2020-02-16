const express = require('express');
const route = express.Router();

const { getSchedule } = require('../controller/schedule');
const {getAllScheduleMiddleware} = require('../middleware/schedule');

route
	.get('/', getAllScheduleMiddleware, getSchedule)
	.get('/:scheduleId', getSchedule);

module.exports = route;
