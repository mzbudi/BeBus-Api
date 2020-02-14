
const helper = require('../helper/');
const jwt = require('jsonwebtoken');

const {registerUser, loginUser} = require('../model/auth');

module.exports = {
	registerUser: async (request, response) => {
		try {
			const result = await registerUser(request.body);
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
	loginUser: async (request, response) => {
		try {
			const result = await loginUser(request.body.user_username, request.body.user_password);
			const loginData = { ...result };
			const token = jwt.sign(loginData, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d', });
			return helper.response(response, 200, { ...result, token });
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
