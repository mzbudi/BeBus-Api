const express = require('express');
const route = express.Router();
const { getStationByCityId } = require('../controller/station');
const { getAllStationMiddleware, getStationByCityIdMiddleware } = require('../middleware/station');

route
	.get('/', getAllStationMiddleware, getStationByCityId)
	.get('/:city_id', getStationByCityIdMiddleware, getStationByCityId);

module.exports = route;