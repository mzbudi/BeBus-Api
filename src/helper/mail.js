
module.exports = {
	forgotMail : ( code ) => {
		return (
			`<div style="background-color:#de223a; height:30px"></div>
            <center><img src="http://18.141.144.141/assets/splash.png"></center>
            <b>Hello this is your Code to Change Password : ${code}</b>
            <div style="background-color:#de223a; height:30px"></div>`
		);
	}
};