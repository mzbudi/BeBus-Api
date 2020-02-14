const connection = require('../config/mysql');
const bcrypt = require('bcryptjs');

module.exports = {
	login: (username, password) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM user WHERE (user_username=? OR user_email=?) ', [username, username], (error, result) => {
				if (!error) {
					if (result.length) {
						if(bcrypt.compareSync(password, result[0].user_password)){
							const finalResult = result[0];
							delete finalResult.password;
							resolve(finalResult);
						}
					}
					reject('Invalid username or password');
				} else {
					reject(error);
				}
			}
			);
		});
	},
	register: (setData) => {
		return new Promise((resolve, reject) => {
			setData.user_password =  bcrypt.hashSync(setData.user_password, 3);
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
