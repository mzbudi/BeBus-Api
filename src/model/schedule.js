const connection = require('../config/mysql');

module.exports = {
	getAllSchedule: (query) => {
		return new Promise((resolve, reject) => {
			//apply filters...
			let where = [];
			// let orderBy = ['schedule_departure_time', 'ASC']
			if (query.date) { //filter date?
				where.push(`DATE(schedule_departure_time)='${query.date}'`);
			}
			//filter by city or station
			if (query.departureCity) { //From
				where.push(`(schedule_departure_city_id=${query.departureCity})`);
			} else if (query.departureStation) { //From station?
				where.push(`(schedule_departure_station_id=${query.departureStation})`);
			}
			if (query.arrivalCity) { //To
				where.push(`(schedule_arrival_city_id=${query.arrivalCity})`);
			} else if (query.arrivalStation) { //To station?
				where.push(`(schedule_arrival_station_id=${query.arrivalStation})`);
			}
			//filter minimum available seats
			if (query.minAvailableSeats) { //how many passengers?
				where.push(`(bus_capacity-schedule_claimed_seat >= ${query.minAvailableSeats})`);
			}
			//filter minimum price
			if (query.minPrice) {
				where.push(`(schedule_price >= ${query.minPrice})`);
			}
			//filter maximum price
			if (query.maxPrice) {
				where.push(`(schedule_price <= ${query.maxPrice})`);
			}
			//filter minimum departure time
			if (query.minDepartureTime) {
				where.push(`TIME(schedule_departure_time) >= '${query.minDepartureTime}:00'`);
			}
			//filter maximum departure time
			if (query.maxDepartureTime) {
				where.push(`(TIME(schedule_departure_time) <= '${query.maxDepartureTime}:59')`);
			}
			//filter minimum arrival time
			if (query.minArrivalTime) {
				where.push(`(TIME(schedule_arrival_time) >= '${query.minArrivalTime}:00')`);
			}
			//filter maximum arrival time
			if (query.maxArrivalTime) {
				where.push(`(TIME(schedule_arrival_time) <= '${query.minArrivalTime}:59')`);
			}
			let whereClause = (where.length) ? 'WHERE ' + where.join(' AND ') : '';

			connection.query(`
            SELECT * FROM (
				SELECT 
					a.*, b.*,d.station_city_id schedule_departure_city_id, 
					e.station_city_id schedule_arrival_city_id, COUNT(*) schedule_claimed_seat 
				FROM schedule a
				JOIN bus b ON schedule_bus_id=bus_id
				JOIN booking c ON a.schedule_id=booking_schedule_id 
				JOIN station d ON d.station_id=a.schedule_departure_station_id
				JOIN station e ON e.station_id=a.schedule_arrival_station_id
				GROUP BY c.booking_schedule_id
			) as f
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
