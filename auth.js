const express = require("express")
const session = require('express-session');
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const axios = require("axios")
const path = require("path")
const utils = require("./utils.js")
const dict = require("./locale.js")
const env = require("./env.js")

app = express()
app.set("views", path.join(__dirname, "templates"))
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

app.use(cookieParser(env.SECRET_KEY, {signed: true}))
app.use(express.urlencoded({extended: true}))

const registerSignupAttempt = function(req, res, next) {
	let attempts = parseInt(req.cookies.signupAttempts)
	if (!isNaN(attempts)) {
		if (attempts < env.SIGNUP_ATTEMPTS && attempts > -1) {
			res.cookie("signupAttempts", attempts + 1, {expiresIn: env.SIGNUP_LOCK})
			next()
		} else 
			res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["429"]})
	} else {
		res.cookie("signupAttempts", 0, {expiresIn: env.SIGNUP_LOCK})
		next()
	}
}

const registerLoginAttempt = function(req, res, next) {
	let attempts = parseInt(req.cookies.loginAttempts)
	if (!isNaN(attempts)) {
		if (attempts < env.LOGIN_ATTEMPTS && attempts > -1) {
			res.cookie("loginAttempts", attempts + 1, {expiresIn: env.LOGIN_LOCK})
			next()
		} else 
			res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["429"]})
	} else {
		res.cookie("loginAttempts", 0, {expiresIn: env.LOGIN_LOCK})
		next()
	}
}

const verifyPage = function(req, res, mail) {
	res.cookie("mail", mail, {signed: true, maxAge: 3600000})
	let token = jwt.sign({mail: mail}, env.SECRET_KEY, {expiresIn: "1h"})
	console.log(token)
	// utils.sendVerifyLetter(mail, token)
	res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: [`verify-link-sent`, token]})
}

const resetPage = function(req, res, mail) {
	res.cookie("mail", mail, {signed: true, maxAge: 3600000})
	let token = jwt.sign({mail: mail}, env.SECRET_KEY, {expiresIn: "1h"})
	console.log(token)
	// utils.sendResetLetter(mail, token)
	res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: [`reset-link-sent`, token]})
}

app.get("/", (req, res)=>{
	res.render("index")
})

app.get("/verify/:link", (req, res) => {
	jwt.verify(req.params.link, env.SECRET_KEY, async (err, payload) => {
		if (err) 
			res.render("status", {stts: env.INFO, lang: req.cookies.lang, dict: dict, msgs: ["NOTVER"]})
		else {
			let mail = req.signedCookies.mail
			let date = new Date()

			if (payload.mail == mail) 
			await axios.get(env.URL_API + `/rest/users?mail=${mail}`, {
					headers: {
						"Authorization": "Bearer " + env.TOKEN_API
					}
				})
					.then(async resp => {
						if (resp.data) {
							let user = resp.data[0]
							await axios.put(env.URL_API + `/rest/users?mail=${mail}`, {
								is_verified: true,
								password: user.password,
								name: user.name,
								second_name: user.second_name,
								picture_url: user.profile_url,
								mail: user.mail,
								contact_mail: user.contact_mail,
								phone: user.phone,
								contact_phone: user.contact_phone,
								country: user.country,
								region: user.region,
								city: user.city,
								bio: user.bio,
								birth_date: user.birth_date,
								date_registration: user.date_registration,
								date_edit: date.toISOString()
							}, { 
								headers: {
									"Authorization": "Bearer " + env.TOKEN_API
								}
							})
								.then(resp => {
									res.cookie("id", user.id, {signed: true})
									res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: ["VER"]})
								})
								.catch(err => {
									res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
								})
						} else 
							res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["401"]})
					})
					.catch(err => {
						res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
					})
			else
				res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["401"]})
		} 
	})
}) 

app.route("/login")
	.get(utils.isNotAuth, (req, res) => {
		res.render("login", {lang: req.cookies.lang, dict: dict, msgs: ["200"]})
	})
	.post(utils.isNotAuth, registerLoginAttempt, async (req, res) => {
		let mail = req.body.mail
		let password = req.body.password 

		await axios.get(env.URL_API + `/rest/users?mail=${mail}`, {
			headers: {
				"Authorization": "Bearer " + env.TOKEN_API
			}
		})
			.then(async resp => {
				if (resp.data) {
					let user = resp.data[0]

					if (user.password.startsWith("google:")) 
						res.redirect(`/auth/google`)
					else if (user.is_verified == false)
						verifyPage(req, res, mail)
					else if (utils.compareHash(password, user.password)) {
						res.cookie("id", user.id, {signed: true})
						res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: ["200"]})
					} else 
						res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["401"]})
				} else 
					res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["401"]})
			})
			.catch(err => {
				res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
			})
	})

app.get("/logout", utils.isAuth, (req, res) => {
	res.clearCookie("id")
	res.clearCookie("mail")
	res.redirect(`/`)
})

app.route("/signup")
	.get(utils.isNotAuth, (req, res) => {
		res.render("signup", {lang: req.cookies.lang, dict: dict, msgs: ["200"]})
	})
	.post(utils.isNotAuth, registerSignupAttempt, async (req, res) => {
		let name = req.body.name
		let second_name = req.body.second_name
		let mail = req.body.mail
		let password = req.body.password
		let date = new Date()

		await axios.get(env.URL_API + `/rest/users?mail=${mail}`, {
			headers: {
				"Authorization": "Bearer " + env.TOKEN_API
			}
		})
			.then(async resp => {
				if (resp.data) {
					let user = resp.data[0]
					if (user.password.startsWith("google:"))
						res.redirect(`/auth/google`)
					else if (user.is_verified == false) 
						verifyPage(req, res, mail)
					else 
						res.redirect(`/auth/login`)
				} else
					await axios.post(env.URL_API + `/rest/users`, {
						is_verified: false,
						password: utils.getHash(password),
						name: name,
						second_name: second_name,
						picture_url: "",
						mail: mail,
						contact_mail: "",
						phone: "",
						contact_phone: "",
						country: "Kazakhstan",
						region: "",
						city: "",
						bio: "",
						birth_date: "1900-01-01",
						date_registration: date.toISOString(),
						date_edit: date.toISOString()
					}, {
						headers: {
							"Authorization": "Bearer " + env.TOKEN_API,
							"Content-Type": "application/json"
						}
					})
						.then(resp => {
							verifyPage(req, res, mail)
						})
						.catch(err => {
							res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
						})
			})
			.catch(err => {
				res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
			})
	})


app.route("/reset")
	.get(utils.isNotAuth, (req, res) => {
		res.render("forgotEmail", {lang: req.cookies.lang, dict: dict, msgs: ["200"]})
	})
	.post(utils.isNotAuth, async (req, res) => {
		let mail = req.body.mail

		await axios.get(env.URL_API + `/rest/users?mail=${mail}`, {
			headers: {
				"Authorization": "Bearer " + env.TOKEN_API
			}
		})
			.then(resp => {
				if (resp.data) {
					let user = resp.data[0]
					if (user.password.startsWith("google:")) 
						res.redirect(`/auth/google`)
					else if (user.is_verified == false)
						verifyPage(req, res, mail)
					else 
						resetPage(req, res, mail)
				} else 
					res.redirect("/auth/signup")
			})
			.catch(err => {
				res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
			})

	})

app.route("/reset/:link")
	.get(utils.isNotAuth, (req, res) => {
		jwt.verify(req.params.link, env.SECRET_KEY, async (err, payload) => {
			if (err) 
				res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
			else {
				let mail = req.signedCookies.mail
				res.render("forgotPassword", {lang: req.cookies.lang, dict: dict})
			}
		})
	})
	.post(utils.isNotAuth, async (req, res) => {
		let password = req.body.password
		let mail = req.signedCookies.mail
		let date = new Date()

		await axios.get(env.URL_API + `/rest/users?mail=${mail}`, {
				headers: {
					"Authorization": "Bearer " + env.TOKEN_API
				}
			})
				.then(async resp => {
					if (resp.data) {
						let user = resp.data[0]
						await axios.put(env.URL_API + `/rest/users?mail=${mail}`, {
							is_verified: user.is_verified,
							password: utils.getHash(password),
							name: user.name,
							second_name: user.second_name,
							picture_url: user.profile_url,
							mail: user.mail,
							contact_mail: user.contact_mail,
							phone: user.phone,
							contact_phone: user.contact_phone,
							country: user.country,
							region: user.region,
							city: user.city,
							bio: user.bio,
							birth_date: user.birth_date,
							date_registration: user.date_registration,
							date_edit: date.toISOString()
						}, { 
							headers: {
								"Authorization": "Bearer " + env.TOKEN_API
							}
						})
							.then(resp => {
								res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: ["200"]})
							})
							.catch(err => {
								res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
							})
					} else 
						res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["401"]})
				})
				.catch(err => {
					res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
				})
	})

module.exports = app

