const helper = require('../helper');
const {getAllStation, getStationByCityId} = require('../model/station');


module.exports = {
	getStationByCityId : async (request, response) => {
		try {
			const city_id = request.params.city_id;
			const nameParams = request.query.nameParams ? request.query.nameParams : '';
			if(city_id === undefined){
				const result = await getAllStation(nameParams);
				return helper.response(response,200,result);
			}else{
				const result = await getStationByCityId(city_id);
				return helper.response(response,200,result);
			}
		} catch (error) {
			return helper.response(response, 400,{message:' Data Does not Exist'});
		}
	},
};