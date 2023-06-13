const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const axios = require("axios")
const env = require("./env.js")
const dict = require("./locale.js")

const salt = bcrypt.genSaltSync(env.SALT_ROUNDS)

function getHash(str) {
	return bcrypt.hashSync(str, salt)
}

function compareHash(str, hash) {
	return bcrypt.compareSync(str, hash)
}

function isNotAuth(req, res, next) {
	if (req.signedCookies.is_auth) 
		res.redirect(`/`)
	else
		next()
}

function isAuth(req, res, next) {
	if (req.signedCookies.is_auth) 
		next()
	else
		res.redirect(`/`)
}

function stringifyParams(params) {
	let url = "?"
	let flag = true
	for (item in params) {
		if (flag) 
			flag = false
		else 
			url += "&"

		url += `${item}=${params[item]}`
	}
	return url
}

 async function thirdPartyAuth(req, res, user, service) {
	await axios.get(env.URL_API + `/rest/users?mail=${user.email}`, {
		headers: {
			"Authorization": "Bearer " + env.TOKEN_API
		}
	})
		.then(async resp => {
			if (resp.data) {
				let user = resp.data[0]
				let date = new Date()

				if (user.password.startsWith(service)) {
					res.cookie("id", jwt.sign({mail: mail, iss: env.ISSUER}, env.SECRET_KEY, {expiresIn: "60d"}))
					res.cookie("is_auth", "1")
					res.redirect("/")
				} else
					res.redirect("/auth/login")
			} else 
				await axios.post(env.URL_API + `/rest/users`, {
					is_verified: true,
					password: `${service}:${utils.getHash(user.mail + user.name)}`, 
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
					birth_date: "1900-01-01",
					date_registration: date.toISOString(),
					date_edit: date.toISOString()
				}, { 
					headers: {
						"Authorization": "Bearer " + env.TOKEN_API
					}
				})
					.then(resp => {
						recursiveAuth(req, res, user, service)
					})
					.catch(err => {
						res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
					})
		})
		.catch(err => {
			res.render("status", {stts: env.BAD, lang: req.cookies.lang, dict: dict, msgs: ["500"]})
		})
}

/*const mailer = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.MAIL_LOGIN,
		pass: env.MAIL_PASSWORD
	}
})

function Mail(_from, _to, _subject, _text) {
	this.from = _from
	this.to = _to
	this.subject = _subject
	this.text = _text
	this.send = async function() {
		let info = await mailer.sendMail(this)
	}
}

function sendVerifyLetter(to, token) {
	let mail = new Mail(env.VERIFICATION_FROM, to, env.VERIFICATION_SUBJECT, env.VERIFICATION_TEXT + token)
	mail.send()
	console.log(`Mail: VERIFICATION to ${to}`)
}

function sendResetLetter(to, token) {
	let mail = new Mail(env.RESET_FROM, to, env.RESET_TEXT + token)
	mail.send()
	console.log(`Mail: RESET to ${to}`)
}

module.exports = {
	getHash,
	cmpareHash, 
	sendVerification
}
*/

module.exports = { getHash, compareHash, isAuth, isNotAuth, stringifyParams, thirdPartyAuth }

