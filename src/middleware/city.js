const helper = require('../helper');

module.exports = {
	getAll: (request, response, next) => {
		var body = {};

		//Check username
		if (request.body.username !== undefined) {
			if (/^[a-z0-9_.]{5,255}$/.test(request.body.username) == false) {
				helper.response(response, 400, 'Invalid username format');
			} else {
				body.user_username = request.body.username;
			}
		} else {
			helper.response(response, 400, 'Username cannot be empty');
		}
        
		request.body = body;
		next();
	},
	login: (request, response, next) => {
		var body = {};

		//Check username
		if (request.body.username !== undefined) {
			body.user_username = request.body.username;
		} else {
			helper.response(response, 400, 'Username cannot be empty');
		}

		//Check password
		if (request.body.password !== undefined) {
			body.user_password = request.body.password;
		} else {
			helper.response(response, 400, 'Password cannot be empty');
		}
		request.body = body;
		next();
	}
};
