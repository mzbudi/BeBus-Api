const express = require('express');
const route = express.Router();

const {loginUser, registerUser} = require('../controller/auth');
const {loginUserMiddleware, registerUserMiddleware} = require('../middleware/auth');

route.post('/login', loginUserMiddleware, loginUser);
route.post('/register', registerUserMiddleware, registerUser);

module.exports = route;
