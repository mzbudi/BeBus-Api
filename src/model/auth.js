const connection = require('../config/mysql');

module.exports = {
	login: (username, password) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM user WHERE (user_username=? AND user_password=?) OR (user_email=? AND user_password=?) ', [username, password, username, password], (error, result) => {
				if (!error) {
					if (result.length) {
						const finalResult = result[0];
						delete finalResult.password;
						resolve(finalResult);
					} else {
						reject('Invalid username or password');
					}
				} else {
					reject(error);
				}
			}
			);
		});
	},
	register: (setData) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO user SET ?', setData, (error, result) => {
				if (!error) {
					const finalResult = { id: result.insertId, ...setData };
					delete finalResult.password;
					resolve(finalResult);
				} else {
					if (error.code == 'ER_DUP_ENTRY')
						reject('Username or email already exist');
					else
						reject(error);
				}
			});
		});
	}
};
