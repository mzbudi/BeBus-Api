const helper = require('../helper');
const jwt = require('jsonwebtoken');

module.exports = {
	//Check login token, then decodes token to request.authData
	authorization: (request, response, next) => {
		try {
			const token = request.get('Authorization');
			if (token !== undefined) {
				jwt.verify(token, 'RAHASIA', (error, decoded) => {
					if (!error) {
						request.authData = decoded;
						next();
					} else {
						return helper.response(response, 400, error);
					}
				});
			} else {
				return helper.response(response, 400, new Error('Login token not provided.'));
			}
		} catch(error){
			return helper.response(response, 400, error);
		}
	}
};
