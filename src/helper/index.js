module.exports = {
	response: (response, status, data) => {
		const result = {};
		result.status = status || 200;
		if (status >= 400) {
			if(data instanceof Error){
				result.error = data.message;
			} else {
				result.error = data;
			}
		} 
		else {
			result.data = data;
		}
		return response.status(result.status).json(result);
	}
};
