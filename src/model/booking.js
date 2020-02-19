const connection = require('../config/mysql');
//const redisClient = require('../config/redis');

module.exports = {
	getAllBooking: (user_id) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN bus ON schedule_bus_id=bus_id WHERE booking_user_id = ? ORDER BY created_at DESC' ,[user_id], (error, result) => {
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
			connection.query('SELECT booking.*, departure_station.station_name as departure_station_name, arrival_station.station_name as arrival_station_name, departure_city.city_name as departure_city_name, arrival_city.city_name as arrival_city_name, schedule.*, bus.*, user.user_email, user.user_email FROM booking JOIN schedule ON booking_schedule_id=schedule_id JOIN station AS departure_station ON schedule_departure_station_id = departure_station.station_id JOIN station AS arrival_station ON schedule_arrival_station_id = arrival_station.station_id JOIN bus ON schedule_bus_id=bus_id JOIN user ON booking_user_id=user.user_id JOIN city as departure_city ON departure_station.station_city_id =  departure_city.city_id JOIN city as arrival_city ON arrival_station.station_city_id =  arrival_city.city_id WHERE booking_number=?', [bookingNumber], (error, result) => {
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
					const finalResult = { booking_id: result.insertId, ...setData };
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
						const finalResult = { booking_number: bookingNumber, ...setData };
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
