
const helper = require('../helper/');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {forgotMail} = require('../helper/mail');

const {registerUser, 
	loginUser, 
	forgotPasswordEmail , 
	forgotPasskeyCode , 
	getEnableToChangePass,
	resetPassword
} = require('../model/auth');

module.exports = {
	registerUser: async (request, response) => {
		try {
			const result = await registerUser(request.body);
			return helper.response(response, 200, result);
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
	loginUser: async (request, response) => {
		try {
			const result = await loginUser(request.body.user_username, request.body.user_password);
			const loginData = { ...result };
			const token = jwt.sign(loginData, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d', });
			return helper.response(response, 200, { ...result, token });
		} catch (error) {
			return helper.response(response, 400, error);
		}
	},
	forgotPasswordEmail: async (request, response) => {
		try{
			const resultEmail = await forgotPasswordEmail(request.body.user_email);
			const verifCode = ((min, max) => Math.floor(Math.random() * (max - min + 1)) + min)(1000, 9999);
			let reset_key = {
				reset_key:verifCode
			};
			if(resultEmail.length>0){
				await forgotPasskeyCode(resultEmail[0].user_id, reset_key);
				let transporter = nodemailer.createTransport({
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						user: process.env.EMAIL_UID,
						pass: process.env.EMAIL_PASS
					}
				});

				transporter.sendMail({
					from: '"BeBus"',
					to: resultEmail[0].user_email,
					subject: 'BeBus Reset Password Verification',
					html: forgotMail(verifCode),
				},function(err){
					if(err){
						return helper.response(response, 400, {message: 'Connection Problem'});
					}
				});
				return helper.response(response, 200, {message: 'Email Verification Has been Sent !'});
			}else{
				return helper.response(response, 400, {message: 'Email Doesn\'t Valid'});
			}

		}catch (error) {
			return helper.response(response, 400, error);
		}
	},
	forgotPassword: async (request, response) => {
		try {
			const enableToChange = await getEnableToChangePass(request.body.resetKey);
			if(enableToChange[0].minute_diff >= -5){
				await resetPassword(request.body.password, request.body.resetKey, enableToChange[0].user_id);
				return helper.response(response, 200, {message: 'Password Succesfully Changed'});
			}else{
				return helper.response(response, 200, {message:'Code Expired'});
			}
		} catch (error) {
			return helper.response(response, 400, {message : 'Code Does Not Match'});
		}
	}
};
