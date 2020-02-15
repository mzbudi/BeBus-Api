const connection = require('../config/mysql');

module.exports = {
	getAllStation : () => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM station JOIN city',(error,result)=>{
				if(!error){
					resolve(result);
				}else{
					reject(error);
				}
			});
		});
	},
	getStationByCityId : (id) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM station JOIN city where station.bus_station_city_id = ? and station.bus_station_city_id = city.city_id',[id],(error, result)=>{
				if(!error){
					if(result.length === 0){
						reject('Data Does Not Exist');
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