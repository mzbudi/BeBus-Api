const express = require('express');
const route = express.Router();

const { getStationByCityId } = require('../controller/station');

route
	.get('/',getStationByCityId)
	.get('/:city_id',getStationByCityId);


module.exports = route;