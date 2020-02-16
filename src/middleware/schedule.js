const helper = require('../helper');

module.exports = {
	getAllScheduleMiddleware: (request, response, next) => {
		let body = {};

		//Check date valid?
		if (request.query.date !== undefined) {
			if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(request.query.date) == false) {
				return helper.response(response, 400, 'Invalid date query');
			}
		}
		//Check departureCity & departureStation valid?
		if (request.query.departureCity !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.departureCity) == false) {
				return helper.response(response, 400, 'Invalid departureCity query');
			}
		} else if (request.query.departureStation !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.departureStation) == false) {
				return helper.response(response, 400, 'Invalid departureStation query');
			}
		}
		if (request.query.departureCity !== undefined && request.query.departureStation !== undefined){
			return helper.response(response, 400, 'departureCity and departureStation should not co-exist in query');
		}
		//Check arrivalCity & arrivalStation valid?
		if (request.query.arrivalCity !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.arrivalCity) == false) {
				return helper.response(response, 400, 'Invalid arrivalCity query');
			}
		} else if (request.query.arrivalStation !== undefined) {
			if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(request.query.arrivalStation) == false) {
				return helper.response(response, 400, 'Invalid arrivalStation query');
			}
		}
		if (request.query.arrivalCity !== undefined && request.query.arrivalStation !== undefined) {
			return helper.response(response, 400, 'arrivalCity and arrivalStation should not co-exist in query');
		}
		//Check minAvailableSeats
		if (request.query.minAvailableSeats !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.minAvailableSeats) == false) {
				return helper.response(response, 400, 'Invalid minAvailableSeats query');
			}
		}
		//check minPrice
		if (request.query.minPrice !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.minPrice) == false) {
				return helper.response(response, 400, 'Invalid minPrice query');
			}
		}
		//check maxPrice
		if (request.query.maxPrice !== undefined) {
			if (/^[0-9]{1,9}$/.test(request.query.maxPrice) == false) {
				return helper.response(response, 400, 'Invalid maxPrice query');
			}
		}
		//check minDepartureTime
		if (request.query.minDepartureTime !== undefined) {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.minDepartureTime) == false) {
				return helper.response(response, 400, 'Invalid minDepartureTime query');
			}
		}
		//check maxDepartureTime
		if (request.query.maxDepartureTime !== undefined) {
			if (/^[0-9]{2}:[0-9]{2}$/.test(request.query.maxDepartureTime) == false) {
				return helper.response(response, 400, 'Invalid maxDepartureTime query');
			}
		}
		next();
	}
};
