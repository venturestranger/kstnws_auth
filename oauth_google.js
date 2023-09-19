const express = require("express")
const cookieParser = require("cookie-parser")
const axios = require("axios")
const path = require("path")
const utils = require("./utils.js")
const dict = require("./locale.js")
const env = require("./env.js")
const { OAuth2Client } = require("google-auth-library");

client = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_REDIRECT_URL);

app = express()
app.set("views", path.join(__dirname, "templates"))
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

app.use(express.static("static"))
app.use(cookieParser(env.SECRET_KEY, {signed: true}))

app.get('/google', utils.isNotAuth, (req, res) => {
	const authorizeUrl = client.generateAuthUrl({
		access_type: 'offline',
		scope: 'profile email'
	});
	res.redirect(authorizeUrl);
});

app.get('/google/callback', utils.isNotAuth, async (req, res) => {
	const { code } = req.query;
	const { tokens } = await client.getToken(code);
	client.setCredentials(tokens);

	const { data } = await axios.get(env.GOOGLE_API_URL, {
		headers: {
			"Authorization": `Bearer ${tokens.access_token}`
		}
	});

	await axios.get(env.URL_API + `/rest/users?mail=${data.email}`, {
		headers: {
			"Authorization": "Bearer " + env.TOKEN_API
		}
	})
		.then(async resp => {
			if (resp.data) {
				let user = resp.data[0]
				if (user.password.startsWith("google:")) 
					utils.thirdPartyAuth(req, res, data, "google")
				else 
					res.redirect("/auth/login")
			} else 
				utils.thirdPartyAuth(req, res, data, "google")
		})
		.catch(err => {
			res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
		})
})


module.exports = app
