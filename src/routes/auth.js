const express = require('express');
const route = express.Router();

const authController = require('../controller/auth');
const authMiddleware = require('../middleware/auth');

route.post('/login', authMiddleware.login, authController.login);
route.post('/register', authMiddleware.register, authController.register);

module.exports = route;
