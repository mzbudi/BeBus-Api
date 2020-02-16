const express = require('express');
const route = express.Router();

const {loginUser, registerUser, forgotPasswordEmail, forgotPassword} = require('../controller/auth');
const {loginUserMiddleware, registerUserMiddleware, forgotPasswordEmailMiddleware, forgotPasswordMiddleware} = require('../middleware/auth');

route.post('/login', loginUserMiddleware, loginUser);
route.post('/register', registerUserMiddleware, registerUser);
route.post('/forgot_password_email', forgotPasswordEmailMiddleware, forgotPasswordEmail);
route.post('/forgotPassword/', forgotPasswordMiddleware, forgotPassword);

module.exports = route;
