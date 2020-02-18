const express = require('express');
const route = express.Router();

const { getCity } = require('../controller/city');
const { getCityByIdMiddleware, getAllCityMiddleware} = require('../middleware/city');

route
	.get('/', getAllCityMiddleware, getCity)
	.get('/:cityId', getCityByIdMiddleware, getCity);

module.exports = route;
