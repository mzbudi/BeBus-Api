const helper = require('../helper');

module.exports = {
	registerUserMiddleware: (request, response, next) => {
		var body = {};

		//Check password
		if (request.body.password !== undefined) {
			if (/^.{3,255}$/.test(request.body.password) == false) {
				helper.response(response, 400, 'Password too short');
			} else {
				body.user_password = request.body.password;
			}
		} else {
			helper.response(response, 400, 'Password cannot be empty');
		}

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

		//Check phone (optional)
		if (request.body.phone !== undefined) {
			if (/^[0-9]{9,15}$/.test(request.body.phone) == false) {
				helper.response(response, 400, 'Invalid phone number');
			} else {
				body.user_phone = request.body.phone;
			}
		}
        
		//Check name
		if (request.body.name !== undefined) {
			if (/^[a-zA-Z@0-9' ]{3,255}$/.test(request.body.name) == false) {
				helper.response(response, 400, 'Invalid name format');
			} else {
				body.user_name = request.body.name;
			}
		} else {
			helper.response(response, 400, 'Name cannot be empty');
		}

		//Check Email
		if (request.body.email !== undefined) {
			if (/^[a-zA-Z@0-9_.]{3,255}$/.test(request.body.email) == false) {
				helper.response(response, 400, 'Invalid email format');
			} else {
				body.user_email = request.body.email;
			}
		} else {
			helper.response(response, 400, 'Email cannot be empty');
		}
		request.body = body;
		next();
	},
	loginUserMiddleware: (request, response, next) => {
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
