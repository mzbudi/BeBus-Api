const helper = require('../helper');
const {getAllStation, getStationByCityId} = require('../model/station');


module.exports = {
    getAllStation : async (request, response) => {
        try{
            const result = await getAllStation()
            return helper.response(response,200,result)
        }catch{
            return helper.response(response,400,{message: "Data Does not Exist"})
        }
    },
    getStationByCityId : async (request, response) => {
        try {
            const city_id = request.params.city_id
            if(city_id === undefined){
                const result = await getAllStation()
                return helper.response(response,200,result)
            }else{
                const result = await getStationByCityId(city_id);
                return helper.response(response,200,result);
            }
        } catch (error) {
            return helper.response(response, 400,{message:" Data Does not Exist"})
            throw error
        }
    }

}