const express = require("express")
const cookieParser = require("cookie-parser")
const axios = require("axios")
const path = require("path")
const utils = require("./utils.js")
const dict = require("./locale.js")
const env = require("./env.js")
const { OAuth2Client } = require('google-auth-library');

client = new OAuth2Client(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_REDIRECT_URI);

app = express()
app.set("views", path.join(__dirname, "templates"))
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

app.use(express.static("static"))
app.use(cookieParser(env.SECRET_KEY, {signed: true}))

const recursiveAuth = async function(req, res, user) {
	await axios.get(env.URL_API + `/rest/users?mail=${user.email}`, {
		headers: {
			"Authorization": "Bearer " + env.TOKEN_API
		}
	})
		.then(async resp => {
			if (resp.data) {
				let user = resp.data[0]
				if (user.password.startsWith("google:")) {
					res.cookie("id", user.id, {signed: true})
					res.render("status", {lang: req.cookies.lang, dict: dict, msgs: ["200"]})
				} else
					res.redirect("/login")
			} else 
				await axios.post(env.URL_API + `/rest/users`, {
					is_verified: true,
					password: "google:" + utils.getHash(user.mail + user.name), 
					name: user.given_name,
					second_name: user.family_name,
					picture_url: user.picture,
					mail: user.email,
					contact_mail: "",
					phone: "", 
					contact_phone: "",
					country: "", 
					region: "", 
					city: "", 
					bio: "",
					birth_date: "1900-01-01"
				}, { 
					headers: {
						"Authorization": "Bearer " + env.TOKEN_API
					}
				})
					.then(resp => {
						recursiveAuth(req, res, user)
					})
					.catch(err => {
						res.render("status", {lang: req.cookies.lang, dict: dict, msgs: ["500"]})
					})
		})
		.catch(err => {
			res.render("status", {lang: req.cookies.lang, dict: dict, msgs: ["500"]})
		})
}

app.get('/auth/google', utils.isNotAuth, (req, res) => {
	const authorizeUrl = client.generateAuthUrl({
		access_type: 'offline',
		scope: 'profile email'
	});
	res.redirect(authorizeUrl);
});

app.get('/auth/google/callback', utils.isNotAuth, async (req, res) => {
	const { code } = req.query;
	const { tokens } = await client.getToken(code);
	client.setCredentials(tokens);

	const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
		headers: {
			"Authorization": `Bearer ${tokens.access_token}`
		}
	});

	recursiveAuth(req, res, data)
});

module.exports = app
