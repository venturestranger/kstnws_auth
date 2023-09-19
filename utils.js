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
	console.log(user)
	await axios.get(env.URL_API + `/rest/users?mail=${user.email}`, {
		headers: {
			"Authorization": "Bearer " + env.TOKEN_API
		}
	})
		.then(async resp => {
			if (resp.data) {
				let user = resp.data[0]
				let date = new Date()
				console.log(user, date)

				if (user.password.startsWith(service)) {
					res.cookie("id", jwt.sign({id: user.id, iss: env.ISSUER}, env.SECRET_KEY, {expiresIn: TOKEN_LIFETIME}), {maxAge: env.SESSION_LIFETIME})
					console.log("1")
					res.cookie("is_auth", "1", {maxAge: env.SESSION_LIFETIME, signed: true})
					console.log("2")
					res.redirect("/")
				} else
					res.redirect("/auth/login")
			} else 
				await axios.post(env.URL_API + `/rest/users`, {
					is_verified: true,
					password: `${service}:${utils.getHash(user.email + user.name)}`, 
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

const mailer = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.MAIL_LOGIN,
		pass: env.MAIL_PASSWORD
	}
})

function Mail(_from, _to, _subject, _html) {
	this.from = _from
	this.to = _to
	this.subject = _subject
	this.html = _html
//	this.text = _text
	this.send = async function() {
		let info = await mailer.sendMail(this)
	}
}

function sendVerifyLetter(to, token) {
	const htmlContent = `
	<html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>u ~ div img + div > div {	display:none;}span.MsoHyperlink, span.MsoHyperlinkFollowed {	color:inherit;}a.es-button {	text-decoration:none;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;}.es-header-body a:hover {	color:#666666;}.es-content-body a:hover {	color:#5C68E2;}.es-footer-body a:hover {	color:#333333;}.es-infoblock a:hover {	color:#CCCCCC;}.es-button-border:hover > a.es-button {	color:#FFFFFF;}body {	width:100%;	height:100%;}table {	border-collapse:collapse;	border-spacing:0px;}table td, body, .es-wrapper {	padding:0;	Margin:0;}.es-content, .es-header, .es-footer {	width:100%;	table-layout:fixed;}p, hr {	Margin:0;}h1, h2, h3, h4, h5, h6 {	Margin:0;	font-family:arial, "helvetica neue", helvetica, sans-serif;	letter-spacing:0;}.es-left {	float:left;}.es-right {	float:right;}.es-menu td {	border:0;}s {	text-decoration:line-through;}a {	text-decoration:underline;}.es-menu td a {	font-family:arial, "helvetica neue", helvetica, sans-serif;	text-decoration:none;	display:block;}.es-menu amp-img, .es-button amp-img {	vertical-align:middle;}.es-wrapper {	width:100%;	height:100%;}.es-wrapper-color, .es-wrapper {	background-color:#FAFAFA;}.es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p {	font-family:arial, "helvetica neue", helvetica, sans-serif;	line-height:150%;	letter-spacing:0;}.es-header {	background-color:transparent;}.es-header-body {	background-color:transparent;}.es-header-body p {	color:#333333;	font-size:14px;}.es-header-body a {	color:#666666;	font-size:14px;}.es-footer {	background-color:transparent;}.es-footer-body {	background-color:#FFFFFF;}.es-footer-body p {	color:#333333;	font-size:12px;}.es-footer-body a {	color:#333333;	font-size:12px;}.es-content-body {	background-color:#FFFFFF;}.es-content-body p {	color:#333333;	font-size:14px;}.es-content-body a {	color:#5C68E2;	font-size:14px;}.es-infoblock p {	font-size:12px;	color:#CCCCCC;}.es-infoblock a {	font-size:12px;	color:#CCCCCC;}h1 {	font-size:46px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h2 {	font-size:26px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h3 {	font-size:20px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h4 {	font-size:24px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}h5 {	font-size:20px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}h6 {	font-size:16px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {	font-size:46px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {	font-size:26px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {	font-size:20px;}.es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a {	font-size:24px;}.es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a {	font-size:20px;}.es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a {	font-size:16px;}a.es-button, button.es-button {	padding:10px 30px 10px 30px;	display:inline-block;	background:#5C68E2;	border-radius:0px 0px 0px 0px;	font-size:20px;	font-family:arial, "helvetica neue", helvetica, sans-serif;	font-weight:normal;	font-style:normal;	line-height:120%;	color:#FFFFFF;	text-decoration:none;	width:auto;	text-align:center;	letter-spacing:0;}.es-button-border {	border-style:solid;	border-color:#2CB543 #2CB543 #2CB543 #2CB543;	background:#5C68E2;	border-width:0px 0px 0px 0px;	display:inline-block;	border-radius:0px 0px 0px 0px;	width:auto;}.es-button img {	display:inline-block;	vertical-align:middle;}.es-fw, .es-fw .es-button {	display:block;}.es-il, .es-il .es-button {	display:inline-block;}.es-p10t {	padding-top:10px;}.es-p20r {	padding-right:20px;}.es-p10b {	padding-bottom:10px;}.es-p20l {	padding-left:20px;}.es-p20b {	padding-bottom:20px;}.es-p30t {	padding-top:30px;}.es-p30b {	padding-bottom:30px;}.es-p5t {	padding-top:5px;}.es-p40r { padding-right:40px;}.es-p5b {	padding-bottom:5px;}.es-p40l {	padding-left:40px;}@media only screen and (max-width:600px) {td.es-m-p0r { padding-right:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:36px; text-align:left } h2 { font-size:26px; text-align:left } h3 { font-size:20px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:12px } .es-header-body p, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body a { font-size:16px } .es-footer-body p, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock a { font-size:12px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px } a.es-button, button.es-button { display:inline-block } .es-button-border { display:inline-block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } }</style></head>
	<body><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table cellpadding="0" cellspacing="0" class="es-header" align="center"><tr><td align="center"><table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600"><tr><td class="es-p10t es-p10b es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" class="es-m-p0r" valign="top" align="center"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" class="es-p20b" style="font-size: 0px"><amp-img src="https://tvoykostanay.kz/tQ.png" alt="Logo" style="display:block;font-size:12px" width="100" title="Logo" height="79"></amp-img></td>
	</tr></table></td></tr></table></td></tr></table></td></tr></table><table cellpadding="0" cellspacing="0" class="es-content" align="center"><tr><td align="center"><table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600"><tr><td class="es-p30t es-p30b es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" class="es-p10t es-p10b" style="font-size: 0px"><amp-img src="https://tvoykostanay.kz/mail.png" alt="" style="display: block" width="100" height="72"></amp-img></td></tr><tr><td align="center" class="es-p10b es-m-txt-c"><h1 style="font-size: 46px;line-height: 46px">Верификация аккаунта</h1></td>
	</tr><tr><td align="center" class="es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>Добро пожаловать в сообщество Tvoykostanay!</p><p>Мы рады приветствовать вас на нашем портале. Спасибо за регистрацию!</p><p>Tvoykostanay - это место, где вы можете находить актуальную информацию о событиях, новостях и интересных местах в Костанае.</p><p>Для верификации аккаунта нажмите на кнопку&nbsp;&nbsp;'Верифицировать'</p><p>С уважением, Команда Tvoykostanay</p></td></tr><tr><td align="center" class="es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px"><a href="https://tvoykostanay.kz/auth/verify/${token}" class="es-button" target="_blank" style="border-left-width: 30px;border-right-width: 30px;border-radius: 6px">Верифицировать</a></span></td></tr><tr><td align="center" class="es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>&nbsp;</p></td>
	</tr><tr><td align="center" class="es-p10t es-p5b"><p>Важно! В случае ошибки при регистрации, просим вас скопировать ссылку https://tvoykostanay.kz/auth/verify/${token} и вставить её в браузер, с которого происходила регистрация.</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
	` 
	let mail = new Mail(env.VERIFICATION_FROM, to, env.VERIFICATION_SUBJECT, htmlContent)
	mail.send()
	console.log(`Mail: VERIFICATION to ${to}`)
}

function sendResetLetter(to, token) {
	const htmlContent = `
	<html ⚡4email data-css-strict><head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-custom>u ~ div img + div > div {	display:none;}span.MsoHyperlink, span.MsoHyperlinkFollowed {	color:inherit;}a.es-button {	text-decoration:none;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;}.es-header-body a:hover {	color:#666666;}.es-content-body a:hover {	color:#5C68E2;}.es-footer-body a:hover {	color:#333333;}.es-infoblock a:hover {	color:#CCCCCC;}.es-button-border:hover > a.es-button {	color:#FFFFFF;}body {	width:100%;	height:100%;}table {	border-collapse:collapse;	border-spacing:0px;}table td, body, .es-wrapper {	padding:0;	Margin:0;}.es-content, .es-header, .es-footer {	width:100%;	table-layout:fixed;}p, hr {	Margin:0;}h1, h2, h3, h4, h5, h6 {	Margin:0;	font-family:arial, "helvetica neue", helvetica, sans-serif;	letter-spacing:0;}.es-left {	float:left;}.es-right {	float:right;}.es-menu td {	border:0;}s {	text-decoration:line-through;}a {	text-decoration:underline;}.es-menu td a {	font-family:arial, "helvetica neue", helvetica, sans-serif;	text-decoration:none;	display:block;}.es-menu amp-img, .es-button amp-img {	vertical-align:middle;}.es-wrapper {	width:100%;	height:100%;}.es-wrapper-color, .es-wrapper {	background-color:#FAFAFA;}.es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p {	font-family:arial, "helvetica neue", helvetica, sans-serif;	line-height:150%;	letter-spacing:0;}.es-header {	background-color:transparent;}.es-header-body {	background-color:transparent;}.es-header-body p {	color:#333333;	font-size:14px;}.es-header-body a {	color:#666666;	font-size:14px;}.es-footer {	background-color:transparent;}.es-footer-body {	background-color:#FFFFFF;}.es-footer-body p {	color:#333333;	font-size:12px;}.es-footer-body a {	color:#333333;	font-size:12px;}.es-content-body {	background-color:#FFFFFF;}.es-content-body p {	color:#333333;	font-size:14px;}.es-content-body a {	color:#5C68E2;	font-size:14px;}.es-infoblock p {	font-size:12px;	color:#CCCCCC;}.es-infoblock a {	font-size:12px;	color:#CCCCCC;}h1 {	font-size:46px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h2 {	font-size:26px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h3 {	font-size:20px;	font-style:normal;	font-weight:bold;	line-height:120%;	color:#333333;}h4 {	font-size:24px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}h5 {	font-size:20px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}h6 {	font-size:16px;	font-style:normal;	font-weight:normal;	line-height:120%;	color:#333333;}.es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {	font-size:46px;}.es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {	font-size:26px;}.es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {	font-size:20px;}.es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a {	font-size:24px;}.es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a {	font-size:20px;}.es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a {	font-size:16px;}a.es-button, button.es-button {	padding:10px 30px 10px 30px;	display:inline-block;	background:#5C68E2;	border-radius:0px 0px 0px 0px;	font-size:20px;	font-family:arial, "helvetica neue", helvetica, sans-serif;	font-weight:normal;	font-style:normal;	line-height:120%;	color:#FFFFFF;	text-decoration:none;	width:auto;	text-align:center;	letter-spacing:0;}.es-button-border {	border-style:solid;	border-color:#2CB543 #2CB543 #2CB543 #2CB543;	background:#5C68E2;	border-width:0px 0px 0px 0px;	display:inline-block;	border-radius:0px 0px 0px 0px;	width:auto;}.es-button img {	display:inline-block;	vertical-align:middle;}.es-fw, .es-fw .es-button {	display:block;}.es-il, .es-il .es-button {	display:inline-block;}.es-p10t {	padding-top:10px;}.es-p20r {	padding-right:20px;}.es-p10b {	padding-bottom:10px;}.es-p20l {	padding-left:20px;}.es-p20b {	padding-bottom:20px;}.es-p30t {	padding-top:30px;}.es-p30b {	padding-bottom:30px;}.es-p5t {	padding-top:5px;}.es-p40r { padding-right:40px;}.es-p5b {	padding-bottom:5px;}.es-p40l {	padding-left:40px;}@media only screen and (max-width:600px) {td.es-m-p0r { padding-right:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } td.es-m-p0r { padding-right:0px } td.es-m-p0l { padding-left:0px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:36px; text-align:left } h2 { font-size:26px; text-align:left } h3 { font-size:20px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:12px } .es-header-body p, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body a { font-size:16px } .es-footer-body p, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock a { font-size:12px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px } a.es-button, button.es-button { display:inline-block } .es-button-border { display:inline-block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } }</style></head>
	<body><div class="es-wrapper-color"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top"><table cellpadding="0" cellspacing="0" class="es-header" align="center"><tr><td align="center"><table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" width="600"><tr><td class="es-p10t es-p10b es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" class="es-m-p0r" valign="top" align="center"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" class="es-p20b" style="font-size: 0px"><amp-img src="https://stshzl.stripocdn.email/content/guids/CABINET_58a9bea79564eaeba049da9a494ae9fae24ef96d52bfaa83c7a2fbcf44cc367f/images/tq.png" alt="Logo" style="display:block;font-size:12px" width="100" title="Logo" height="79"></amp-img></td>
	</tr></table></td></tr></table></td></tr></table></td></tr></table><table cellpadding="0" cellspacing="0" class="es-content" align="center"><tr><td align="center"><table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600"><tr><td class="es-p30t es-p30b es-p20r es-p20l" align="left"><table cellpadding="0" cellspacing="0" width="100%"><tr><td width="560" align="center" valign="top"><table cellpadding="0" cellspacing="0" width="100%" role="presentation"><tr><td align="center" class="es-p10t es-p10b" style="font-size: 0px"><amp-img src="https://stshzl.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt="" style="display: block" width="100" height="72"></amp-img></td></tr><tr><td align="center" class="es-p10b es-m-txt-c"><h1 style="font-size: 46px;line-height: 46px">Сброс пароля</h1></td>
	</tr><tr><td align="center" class="es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>&nbsp;</p></td></tr><tr><td align="center" class="es-p10t es-p10b"><span class="es-button-border" style="border-radius: 6px"><a href="https://tvoykostanay.kz/auth/reset/${token}" class="es-button" target="_blank" style="border-left-width: 30px;border-right-width: 30px;border-radius: 6px">Сбросить</a></span></td></tr><tr><td align="center" class="es-p5t es-p5b es-p40r es-p40l es-m-p0r es-m-p0l"><p>&nbsp;</p></td></tr><tr><td align="center" class="es-p10t es-p5b"><p><strong>Важно!</strong> В случае ошибки при сбросе, просим вас скопировать ссылку https://tvoykostanay.kz/auth/reset/${token} и вставить её в браузер, с которого происходила регистрация.</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
	`
	let mail = new Mail(env.RESET_FROM, to,env.RESET_SUBJECT, htmlContent)
	mail.send()
	console.log(`Mail: RESET to ${to}`)
}


module.exports = { getHash, compareHash, isAuth, isNotAuth, stringifyParams, thirdPartyAuth, sendVerifyLetter, sendResetLetter }

