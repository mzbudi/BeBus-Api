const express = require('express');
const route = express.Router();

const { putUserByIdMiddleware } = require('../middleware/user');
const { putUserById, getUserById } = require('../controller/user');
const {uploadMiddleware} = require('../middleware/upload');

route.get('/:id', getUserById);
route.put('/:id',  uploadMiddleware('photo'), putUserByIdMiddleware, putUserById);


module.exports = route;