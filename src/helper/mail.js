
module.exports = {
	forgotMail : ( code ) => {
		return (
			`<div style="background-color:#de223a; height:30px"></div>
            <center><img style="height:200px; width:200px; margin-bottom: 16px"  src="http://18.141.144.141/assets/splash.png"></center>
            <center><b>Hello this is your Code to Change Password : ${code}</b></center>
            <div style="background-color:#de223a; height:30px; margin-top:16px"></div>`
		);
	},
	succesMail : (item) => {
		return (
			`<div style="background-color:#de223a; height:30px"></div>
            <center><img style="height:200px; width:200px; margin-bottom: 16px"  src="http://18.141.144.141/assets/splash.png"></center>
            <center><h4>Your Transaction Succes ! </h4></center>
            <hr>
            <div style="margin-left:30px;">
            <p>Departure City : ${item.departure_city_name}</p> <p>Station : ${item.departure_station_name} </p> <p>Date  : ${item.schedule_departure_time}</p>
            </div>
            <hr>
            <div style="margin-left:30px"><p>Arrival City : ${item.arrival_city_name}</p> <p>Station : ${item.arrival_station_name} </p> <p>Date  : ${item.schedule_arrival_time} </p></div>
            <div style="background-color:#de223a; height:30px; margin-top:16px">`
		);
	}
};