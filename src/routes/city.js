const express = require('express');
const route = express.Router();

const { getCity } = require('../controller/city');


route
	.get('/', getCity)
	.get('/:cityId', getCity);

module.exports = route;
