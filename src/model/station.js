const connection = require('../config/mysql');

module.exports = {
	getAllStation : (nameParams) => {
		return new Promise((resolve, reject) => {
			connection.query(`SELECT * FROM station JOIN city where city.city_name like '%${nameParams}%' and station.station_city_id = city.city_id`,(error,result)=>{
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
			connection.query('SELECT * FROM station JOIN city where station.station_city_id = ? and station.station_city_id = city.city_id',[id],(error, result)=>{
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