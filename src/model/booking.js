const connection = require('../config/mysql');

module.exports = {
	getAllBooking: () => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN bus ON schedule_bus_id=bus_id', (error, result) => {
				if (!error) {
					resolve(result);
				} else {
					reject(error);
				}
			});
		});
	},
	getBookingById: (id) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN bus ON schedule_bus_id=bus_id WHERE booking_id=?', [id], (error, result) => {
				if (!error) {
					if (result.length) {
						resolve(result[0]);
					} else {
						reject('City ID not found');
					}
				} else {
					reject(error);
				}
			});
		});
	},
	postBooking: (setData) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO booking SET ?', setData, (error, result) => {
				if (!error) {
					const finalResult = { id: result.insertId, ...setData };
					resolve(finalResult);
				} else {
					reject(error);
				}
			});
		});
	},
	putBooking: (bookingNumber, setData) => {
		return new Promise((resolve, reject) => {
			connection.query('UPDATE booking SET ?', setData, (error, result) => {
				if (!error) {
					if (result.affectedRows) {
						const finalResult = { id: result.insertId, ...setData };
						resolve(finalResult);
					} else {
						reject(new Error(`User with id:${id} not found.`));
					}
				} else {
					reject(error);
				}
			});
		});
	}
};
