const connection = require('../config/mysql');

module.exports = {
	getAllCity: () => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM city', (error, result) => {
				if (!error) {
					resolve(result);
				} else {
					reject(error);
				}
			});
		});
	},
	getCityById: (id) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM city WHERE city_id=?', [id], (error, result) => {
				if (!error) {
					if(result.length){
						resolve(result[0]);
					} else {
						reject('City ID not found');
					}
				} else {
					reject(error);
				}
			});
		});
	}
};
