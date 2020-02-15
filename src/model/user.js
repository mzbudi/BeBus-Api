const connection = require('../config/mysql');
const bcrypt = require('bcryptjs');

module.exports = {
	verifyUser: (id, password) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM user WHERE id=?', [id], (error, result) => {
				if (!error) {
					if (result[0] !== undefined) {
						if (bcrypt.compareSync(password, result[0].user_password)) {
							resolve(true);
						}
					}
					resolve(false);
				} else {
					reject(error);
				}
			}
			);
		});
	},
	putUserById: (id, setData) => {
		return new Promise((resolve, reject) => {
			connection.query('UPDATE user SET ? WHERE user_id=?', [setData, id], (error, result) => {
				if (!error) {
					if (result.affectedRows) {
						const finalResult = { id, ...setData };
						if (finalResult.password) delete finalResult.password;
						resolve(finalResult);
					} else {
						reject('Specified user id not found.');
					}
				} else {
					if (error.code == 'ER_DUP_ENTRY') {
						reject(new Error('Username or email already exist'));
					} else {
						reject(error);
					}
				}
			});
		});
	}
};
