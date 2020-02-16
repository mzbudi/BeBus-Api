const connection = require('../config/mysql');
const bcrypt = require('bcryptjs');

module.exports = {
	loginUser: (username, password) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM user WHERE (user_username=? OR user_email=?) ', [username, username], (error, result) => {
				if (!error) {
					if (result.length) {
						if(bcrypt.compareSync(password, result[0].user_password)){
							const finalResult = result[0];
							delete finalResult.user_password;
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
	registerUser: (setData) => {
		return new Promise((resolve, reject) => {
			setData.user_password =  bcrypt.hashSync(setData.user_password, 3);
			connection.query('INSERT INTO user SET ?', setData, (error, result) => {
				if (!error) {
					const finalResult = { id: result.insertId, ...setData };
					delete finalResult.user_password;
					resolve(finalResult);
				} else {
					if (error.code == 'ER_DUP_ENTRY')
						reject('Username or email already exist');
					else
						reject(error);
				}
			});
		});
	},
	forgotPasswordEmail: (user_email) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT user_email, user_username, user_id from user WHERE user_email = ?', [user_email],(error,result)=>{
				if(!error){
					resolve(result);
				}else{
					reject(error);
				}
			});
		});
	},
	forgotPasskeyCode : (user_id, passKey)=>{
		return new Promise((resolve, reject) => {
			connection.query('UPDATE user SET ? WHERE user_id = ?',[passKey, user_id], (error, result)=>{
				if(!error){
					resolve(result);
				}else{
					reject(error);
				}
			});
		});
	},
	getEnableToChangePass : (resetKey) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT user_id, TIMESTAMPDIFF(MINUTE, NOW(), updated_at) AS minute_diff FROM user WHERE reset_key = ?',[resetKey],(error, result)=>{
				if(!error){
					resolve(result);
				}else{
					reject(error);
				}
			});
		});
	},
	resetPassword : (password, resetKey, user_id)=>{
		const setData = {};
		setData.user_password =  bcrypt.hashSync(password, 3);
		console.log(setData);
		return new Promise((resolve, reject) => {
			connection.query('UPDATE user SET ? WHERE user_id = ?',[setData,user_id],(error,result)=>{
				if(!error){
					if(result.length === 0 ){
						reject(error);
					}else{
						resolve(result);
					}
					
				}else{
					reject(error);
				}
			});
		});
	}
};
