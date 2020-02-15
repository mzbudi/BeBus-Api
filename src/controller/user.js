const helper = require('../helper/');

const { putUserById } = require('../model/user');

module.exports = {
	putUserById: async (request, response) => {
		try {
			const result = await putUserById(request.params.id, request.body);
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
