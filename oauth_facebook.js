const express = require("express")
const axios = require("axios")
const utils = require("./utils.js")
const env = require("./env")

app = express()

app.get("/facebook", async (req, res) => {
	let params = {
		client_id: env.FACEBOOK_APP_ID,
		redirect_uri: encodeURIComponent(env.FACEBOOK_REDIRECT_URL),
		scope: "email",
		response_type: "code",
		auth_type: "rerequest",
		display: "popup"
	}

	const url = env.FACEBOOK_URL + utils.stringifyParams(params)
	res.redirect(url)
}) 

app.get("/facebook/callback", async (req, res) => {
	const code = req.query.code
	await axios({
		url: "https://graph.facebook.com/v4.0/oauth/access_token",
		method: "get",
		params: {
			client_id: env.FACEBOOK_APP_ID,
			client_secret: env.FACEBOOK_APP_SECRET,
			redirect_uri: "/auth/facebook/callback",
			code: code
		},
	})
		.then(async resp => {
			const { user } = await axios({
				url: 'https://graph.facebook.com/me',
				method: 'get',
				params: {
					fields: ['id', 'email', 'first_name', 'last_name'].join(','),
					access_token: data.accesstoken,
				},
			})

			console.log(user)
			//utils.thirdPartyAuth(req, res, data, "facebook")
			res.send("success")
		})
		.catch(resp => {
			res.send("error")
		})
})

module.exports = app
