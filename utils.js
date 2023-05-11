const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")

const MAIL = "kepler7563@gmail.com"
const PASSWORD = "vpfqrqliojiqwxce"
const VERIFICATION_FROM = "tvoykostanay.kz"
const VERIFICATION_SUBJECT = "verification link"
const VERIFICATION_TEXT = "Verify your accout: "
const SALT_ROUNDS = 10

const salt = bcrypt.genSaltSync(SALT_ROUNDS)

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

module.exports = { getHash, compareHash, isAuth, isNotAuth }

