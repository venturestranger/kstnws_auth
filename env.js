const env = {
	SECRET_KEY: "domain",
	SIGNUP_ATTEMPTS: 3,
	SIGNUP_LOCK: "1m",
	LOGIN_ATTEMPTS: 3,
	LOGIN_LOCK: "1m",
	PORT: 3000,

	//URL_API: "http://tvoykostanay.kz/api",
	URL_API: "http://localhost:5000/api",
	TOKEN_API: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA0LTE5VDE5OjExOjM5LjgwNzU4MjIrMDY6MDAiLCJpYXQiOjE2ODE5MDYyOTksImlzcyI6ImRvbWFpbiJ9.N2bzXJW0r-obDXX30UP1lAbm9ULn-inXvDObQcGboB0",

	GOOGLE_CLIENT_ID: '484591857221-6acq88tleltg8c0eaa7vob7ic6sq9elq.apps.googleusercontent.com',
	GOOGLE_CLIENT_SECRET: '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',
	GOOGLE_REDIRECT_URI: 'http://localhost:3000/auth/google/callback'
}

module.exports = env
