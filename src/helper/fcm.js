const admin = require('firebase-admin');

module.exports = {
	sendFcmNotification: (fcmToken, message, title) => {
		return new Promise((resolve, reject) => {
			let message = {
				notification: {
					title: title,
					body: message,
				},
				token: fcmToken
			};
			admin.messaging().send(message)
				.then((response) => {
					resolve(true)
				})
				.catch((error) => {
					resolve(false)
				});
		});
	};
};