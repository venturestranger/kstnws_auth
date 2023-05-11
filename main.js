const express = require("express")
const auth = require("./auth.js")
const oauthGoogle = require("./oauth_google.js")
const env = require("./env.js")

app = express()
app.use("/", auth)
app.use("/", oauthGoogle)

app.listen(env.PORT, () => {
	console.log("Server ON")
})
