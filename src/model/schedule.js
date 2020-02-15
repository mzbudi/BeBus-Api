const connection = require('../config/mysql');

module.exports = {
	getAllSchedule: (query) => {
		return new Promise((resolve, reject) => {
			//apply filters...
			let where = [];
			if (query.date) { //filter date?
				where.push(`DATE(schedule_departure_time)='${query.date}'`);
			}
			if (query.from) { //From station?
				where.push(`(station_city_id=${query.from})`);
			}
			if (query.to) { //To station?
				where.push(`(station_city_id=${query.to})`);
			}
			if (query.passenger) { //how many passengers?
				where.push(`(bus_capacity-claimed_seat >= ${query.passenger})`);
			}
			let whereClause = (where.length) ? 'WHERE ' + where.join(' AND ') : '';
			connection.query(`
            SELECT * FROM (
                SELECT schedule.*, bus.*, COUNT(*) AS claimed_seat 
                FROM schedule 
                    JOIN bus ON schedule_bus_id=bus_id
                    JOIN booking ON schedule.schedule_id=booking_schedule_id 
                GROUP BY booking_schedule_id
            ) as x
            ${whereClause}
            `, (error, result) => {
				if (!error) {
					resolve(result);
				} else {
					reject(error);
				}
			});
		});
	},
	getScheduleById: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(`
			SELECT a.*, b.*, GROUP_CONCAT(booking_seat_number) as claimed_seats 
				FROM schedule a
				JOIN bus b ON schedule_bus_id=bus_id 
				JOIN booking c ON schedule_id=booking_schedule_id
				WHERE schedule_id=?
			`, [id], (error, result) => {
				if (!error) {
					if (result.length) {
						resolve(result[0]);
					} else {
						reject('Schedule ID not found');
					}
				} else {
					reject(error);
				}
			});
		});
	}
};
