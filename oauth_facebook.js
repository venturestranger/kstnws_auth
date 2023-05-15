const express = require("express")

app = express()
FACEBOOK_URL = `https://www.facebook.com/v4.0/dialog/oauth?$`
FACEBOOK_APP_ID = ""

app.get("/auth/facebook", (req, res) => {
	const params = queryString.stringify({
		client_id: FACEBOOK_APP_ID,
		redirect_uri: 'https://www.example.com/authenticate/facebook/',
		scope: ['email', 'user_friends'].join(','), // comma seperated string
		response_type: 'code',
		auth_type: 'rerequest',
		display: 'popup',
	});
	const url = FACEBOOK_URL + params
	axios.get(url)
		.then(resp => {
			consoole.log(resp)

		})
		.catch(err => {
			res.send("Error")
		})
}) 

app.listen(3000, ()=> {
	console.log("listening")
})
