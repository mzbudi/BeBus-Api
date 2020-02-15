const express = require('express');
const route = express.Router();

const { putUserByIdMiddleware } = require('../middleware/user');
const { putUserById } = require('../controller/user');
const {uploadMiddleware} = require('../middleware/upload');

route.put('/:id',  uploadMiddleware('photo'), putUserByIdMiddleware, putUserById);


module.exports = route;