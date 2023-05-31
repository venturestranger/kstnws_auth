const env = {
	SECRET_KEY: "domain",
	SIGNUP_ATTEMPTS: 3,
	SIGNUP_LOCK: "1m",
	LOGIN_ATTEMPTS: 3,
	LOGIN_LOCK: "1m",
	PORT: 4000,

	URL_API: "http://tvoykostanay.kz/api",
	TOKEN_API: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA0LTE5VDE5OjExOjM5LjgwNzU4MjIrMDY6MDAiLCJpYXQiOjE2ODE5MDYyOTksImlzcyI6ImRvbWFpbiJ9.N2bzXJW0r-obDXX30UP1lAbm9ULn-inXvDObQcGboB0",

	GOOGLE_API_URL: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
	GOOGLE_CLIENT_ID: "484591857221-6acq88tleltg8c0eaa7vob7ic6sq9elq.apps.googleusercontent.com",
	GOOGLE_CLIENT_SECRET: "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",
	GOOGLE_REDIRECT_URL: "http://tvoykostanay.kz/auth/google/callback",

	FACEBOOK_URL: "https://www.facebook.com/v4.0/dialog/oauth",
	FACEBOOK_APP_ID: "983579216425078",
	FACEBOOK_APP_SECRET: "6eb32226c5be7e629cfd3ada0da31a26",
	FACEBOOK_REDIRECT_URL: "https://0669-188-130-157-73.ngrok-free.app",

	MAIL_LOGIN: "kepler7563@gmail.com",
	MAIL_PASSWORD: "vpfqrqliojiqwxce",

	LETTER_FROM: "tvoykostanay.kz",

	VERIFICATION_FROM: "tvoykostanay.kz",
	VERIFICATION_SUBJECT: "verification link",
	VERIFICATION_TEXT: "Verify your accout: ",

	RESET_FROM: "tvoykostanay.kz",
	RESET_SUBJECT: "verification link",
	RESET_TEXT: "Verify your accout: ",

	SALT_ROUNDS: 10,

	OK: 1,
	INFO: 2,
	BAD: 3
}

module.exports = env
