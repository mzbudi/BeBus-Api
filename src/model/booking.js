const connection = require('../config/mysql');
//const redisClient = require('../config/redis');

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
	getBookingById: (bookingId) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN bus ON schedule_bus_id=bus_id WHERE booking_id=?', [bookingId], (error, result) => {
				if (!error) {
					if (result.length) {
						resolve(result[0]);
					} else {
						reject('Booking not found');
					}
				} else {
					reject(error);
				}
			});
		});
	},
	getBookingByBookingNumber: (bookingNumber) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN bus ON schedule_bus_id=bus_id WHERE booking_number=?', [bookingNumber], (error, result) => {
				if (!error) {
					if (result.length) {
						resolve(result[0]);
					} else {
						reject('Booking not found');
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
			connection.query('UPDATE booking SET ? WHERE booking_number=?', [setData, bookingNumber], (error, result) => {
				if (!error) {
					if (result.affectedRows) {
						const finalResult = { id: result.insertId, ...setData };
						resolve(finalResult);
					} else {
						reject('Booking number not found');
					}
				} else {
					reject(error);
				}
			});
		});
	}
};
