const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const env = require("./env.js")

app = express()
app.use(cors())

app.get("/token/:link", (req, res)=>{
	jwt.verify(req.params.link, env.SECRET_KEY, async (err, payload) => {
		if (err) 
			res.send("null")
		else if (payload.iss == env.ISSUER) 
			res.send(`${payload.id}`)
		else
			res.send("null")
	})
})

module.exports = app
