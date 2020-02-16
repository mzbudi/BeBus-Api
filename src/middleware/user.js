const helper = require('../helper/');
const {verifyUser} = require('../model/user');
const nodemailer = require('nodemailer');

module.exports = {
	putUserByIdMiddleware: async (request, response, next) => {
		if (/^[0-9]+$/.test(request.params.id) == false) {
			return helper.response(response, 400, 'Invalid user ID.');
		}

		const body = {};
		//Check name
		if (request.body.name !== undefined) {
			if (/^[a-zA-Z '-]{5,200}$/.test(request.body.name) == false) {
				return helper.response(response, 400, 'Invalid name');
			} else {
				body.user_name = request.body.name;
			}
		}
		//Check email
		if (request.body.email !== undefined) {
			if (/^[0-9a-zA-Z@_.]{3,100}$/.test(request.body.email) == false) {
				return helper.response(response, 400, 'Invalid email');
			} else {
				body.user_email = request.body.email;
			}
		}
		//Check phone
		if (request.body.phone !== undefined) {
			if (/^[0-9]{9,15}$/.test(request.body.phone) == false) {
				return helper.response(response, 400, 'Invalid Invalid phone');
			} else {
				body.user_phone = request.body.phone;
			}
		}
		//Check username
		if (request.body.username !== undefined) {
			if (/^[0-9a-zA-Z_.]{3,100}$/.test(request.body.username) == false) {
				return helper.response(response, 400, 'Invalid username');
			} else {
				body.user_username = request.body.username;
			}
		}
		//Check password
		if (request.body.new_password !== undefined) {
			if (/^.{5,100}$/.test(request.body.new_password) == true) {
				if (request.body.old_password !== undefined) {
					if(await verifyUser(request.params.id, request.body.old_password)){
						body.user_password = request.body.new_password;
					} else {
						return helper.response(response, 400, 'Incorrect old password');
					}
				} else {
					return helper.response(response, 400, 'Old password not specified');
				}
			} else {
				return helper.response(response, 400, 'Password too short');
			}
		}
		//Check photo
		if (request.body.photo !== undefined) {
			body.user_photo = request.body.photo;
		}
		request.body = body;
		next();
	}
};
