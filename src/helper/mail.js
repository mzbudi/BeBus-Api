
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
            <center><b>Hello this is your Code to Change Password : ${item}</b></center>
            <div style="background-color:#de223a; height:30px; margin-top:16px"></div>`
		);
	}
};