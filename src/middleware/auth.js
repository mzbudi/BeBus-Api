const helper = require('../helper');


module.exports = {
	registerUserMiddleware: async (request, response, next) => {
		var body = {};

		//Check password
		if (request.body.password !== undefined && request.body.password !== '') {
			console.log(request.body.password);
			if (/^.{3,255}$/.test(request.body.password) == false) {
				return helper.response(response, 400, 'Password too short');
			} else {
				body.user_password = request.body.password;
			}
		} else {
			return helper.response(response, 400, 'Password cannot be empty');
		}

		//Check username
		if (request.body.username !== undefined && request.body.username !== '') {
			if (/^[a-z0-9_.]{5,255}$/.test(request.body.username) == false) {
				return helper.response(response, 400, 'Invalid username format');
			} else {
				body.user_username = request.body.username;
			}
		} else {
			return helper.response(response, 400, 'Username cannot be empty');
		}

		//Check phone (optional)
		if (request.body.phone !== undefined && request.body.phone !== '' ) {
			if (/^[0-9]{9,15}$/.test(request.body.phone) == false) {
				return helper.response(response, 400, 'Invalid phone number');
			} else {
				body.user_phone = request.body.phone;
			}
		}
        
		//Check name
		if (request.body.name !== undefined && request.body.name !== '') {
			if (/^[a-zA-Z@0-9' ]{3,255}$/.test(request.body.name) == false) {
				return helper.response(response, 400, 'Invalid name format');
			} else {
				body.user_name = request.body.name;
			}
		} else {
			return helper.response(response, 400, 'Name cannot be empty');
		}

		//Check Email
		if (request.body.email !== undefined && request.body.email !== '') {
			if (/^[a-zA-Z@0-9_.]{3,255}$/.test(request.body.email) == false) {
				return helper.response(response, 400, 'Invalid email format');
			} else {
				body.user_email = request.body.email;
			}
		} else {
			helper.response(response, 400, 'Email cannot be empty');
		}
		request.body = body;
		next();
	},
	loginUserMiddleware: (request, response, next) => {
		var body = {};

		//Check username
		if (request.body.username !== undefined && request.body.username !== '') {
			body.user_username = request.body.username;
		} else {
			return helper.response(response, 400, 'Username cannot be empty');
		}
        
		//Check password
		if (request.body.password !== undefined && request.body.password !== '') {
			body.user_password = request.body.password;
		} else {
			return helper.response(response, 400, 'Password cannot be empty');
		}
		request.body = body;
		next();
	},
	forgotPasswordEmailMiddleware: (request,response,next)=>{
		const body ={};
		if(request.body.email !== undefined && request.body.email !== ''){
			body.user_email = request.body.email;
		}else{
			return helper.response(response,400,'E-mail Can\'t be Empty');
		}
		request.body = body;
		next();
	},
	forgotPasswordMiddleware: async (request, response, next)=>{
		const body = {};
		if(request.body.password !== undefined && request.body.password !== ''){
			body.password = request.body.password;
		}else{
			return helper.response(response,400,'Password Can\'t be Empty');
		}
		
		if(request.body.rePassword !== undefined && request.body.rePassword !== ''){
			body.password = request.body.rePassword;
		}else{
			return helper.response(response,400,'Password Can\'t be Empty');
		}

		if(request.body.password !== request.body.rePassword){
			return helper.response(response,400,'Password Does Not Match');
		}

		if(request.body.resetKey !== undefined && request.body.resetKey !== ''){
			body.resetKey = request.body.resetKey;
		}else{
			return helper.response(response, 400, 'Code Must Be Filled');
		}

		request.body = body;
		next();
	}

};
