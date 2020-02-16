const helper = require('../helper/');

const {getAllCity, getCityById} = require('../model/city');

module.exports = {
	getCity: async (request, response) => {
		try {
			if (request.params.id !== undefined && request.params.id !== ''){
				const result = await getCityById(request.params.id);
				return helper.response(response, 200, result);
			} else {
				const result = await getAllCity();
				return helper.response(response, 200, result);
			}
		} catch (error) {
			return helper.response(response, 400, error);
		}
	}
};
