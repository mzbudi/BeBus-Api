const express = require('express');
const route = express.Router();

const { getSchedule } = require('../controller/schedule');
const {getScheduleByIdMiddleware} = require('../middleware/schedule');

route
	.get('/', getSchedule)
	.get('/:scheduleId', getScheduleByIdMiddleware, getSchedule);

module.exports = route;
