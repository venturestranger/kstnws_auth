const express = require("express")
const auth = require("./auth.js")
const env = require("./env.js")
const oauthGoogle = require("./oauth_google.js")
const oauthFacebook = require("./oauth_facebook.js")
const corsEligible = require("./cors_eligible.js")

app = express()
app.use("/auth", auth)
app.use("/auth", oauthGoogle)
app.use("/auth", corsEligible)
// app.use("/auth", oauthFacebook)

app.listen(env.PORT, () => {
	console.log("Server ON")
})
