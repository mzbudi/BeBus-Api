const express = require('express');
const route = express.Router();

const { getCity } = require('../controller/city');


route
	.get('/', getCity)
	.get('/:id', getCity);

module.exports = route;
