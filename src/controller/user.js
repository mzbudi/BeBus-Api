const helper = require('../helper/');
const fs = require('fs');

const { putUserById, getUserById } = require('../model/user');

module.exports = {
	getUserById: async (request, response) => {
		try {
			const result = await getUserById(request.params.id);
			if (result.user_photo !== null && result.user_photo !== '') {
				result.user_photo = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}/assets/${result.user_photo}`;
			}
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
	putUserById: async (request, response) => {
		try {
			const oldUser = await getUserById(request.params.id);
			if(request.body.user_photo !== undefined){
				if (oldUser.user_photo !== null && oldUser.user_photo !== ''){
					fs.unlinkSync(`assets/${oldUser.user_photo}`);
				}
				fs.renameSync(request.body.user_photo.path, `assets/${request.body.user_photo.filename}`);
				request.body.user_photo = request.body.user_photo.filename;
			}
			const newUser = await putUserById(request.params.id, request.body);
			if (newUser.user_photo !== null && newUser.user_photo !== '') {
				newUser.user_photo = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}/assets/${newUser.user_photo}`;
			}
			return helper.response(response, 200, newUser);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
