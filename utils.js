const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const axios = require("axios")
const env = require("./env.js")
const dict = require("./locale.js")

const salt = bcrypt.genSaltSync(env.SALT_ROUNDS)

function getHash(str) {
	let hash = bcrypt.hashSync(str, salt)
	return hash
}

function compareHash(str, hash) {
	return bcrypt.compare(str, hash)
}

function isNotAuth(req, res, next) {
	if (req.signedCookies.id) 
		res.redirect(`/`)
	else
		next()
}

function isAuth(req, res, next) {
	if (req.signedCookies.id) 
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
				if (user.password.startsWith(service)) {
					res.cookie("id", user.id, {signed: true})
					res.render("status", {stts: env.OK, lang: req.cookies.lang, dict: dict, msgs: ["200"]})
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
					birth_date: "1900-01-01"
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
		user: MAIL,
		pass: PASSWORD
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

function wrapToken(token) {
	return VERIFICATION_TEXT + token
}

function sendVerification(to, token) {
	let mail = new Mail(VERIFICATION_FROM, to, VERIFICATION_SUBJECT, wrapToken(token))
	console.log(`Mail: VERIFICATION to ${to}`)
}

module.exports = {
	getHash,
	compareHash, 
	sendVerification
}
*/

module.exports = { getHash, compareHash, isAuth, isNotAuth, stringifyParams, thirdPartyAuth }

