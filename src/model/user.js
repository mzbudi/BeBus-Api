const connection = require('../config/mysql');
const bcrypt = require('bcryptjs');

module.exports = {
	verifyUser: (id, password) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM user WHERE user_id=?', [id], (error, result) => {
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
			if (setData.user_password !== undefined) setData.user_password = bcrypt.hashSync(setData.user_password, 3);
			connection.query('UPDATE user SET ? WHERE user_id=?', [setData, id], (error, result) => {
				if (!error) {
					if (result.affectedRows) {
						const finalResult = { id, ...setData };
						if (finalResult.user_password) delete finalResult.user_password;
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
