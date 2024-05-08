const env = {
	ISSUER: "494c06f86f086f5bb135f241bada2d5ba0cd7a0d99ddcd9023b3e1eea995fa54",
	SESSION_LIFETIME: 3600000,

	SECRET_KEY: "22842213df513efee733b10960b6bf19229c7a5a591f39e7cbacd18010aa537d",
	SIGNUP_ATTEMPTS: 3000,
	SIGNUP_LOCK: 3600000,
	LOGIN_ATTEMPTS: 3000,
	LOGIN_LOCK: 3600000,
	TOKEN_LIFETIME: "60d",
	PORT: 4000,

	URL_API: "https://tvoykostanay.kz/api",
	TOKEN_API: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDI0LTA0LTE4VDEyOjM3OjU4LjU2NDEzMjE3NFoiLCJpYXQiOjE3MTM0NDAyNzgsImlzcyI6IjQ5NGMwNmY4NmYwODZmNWJiMTM1ZjI0MWJhZGEyZDViYTBjZDdhMGQ5OWRkY2Q5MDIzYjNlMWVlYTk5NWZhNTQifQ.6J6AxTNCTLOJWpJsDyXkAkUNc0Yrv9l40Y-g49eptow",

	GOOGLE_API_URL: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
	GOOGLE_CLIENT_ID: "1079797382477-kpge6hqed18vr1hgqmu3oaoh992p0bmj.apps.googleusercontent.com",
	GOOGLE_CLIENT_SECRET: "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",
	//GOOGLE_REDIRECT_URL: "http://localhost:4000/auth/google/callback",
	GOOGLE_REDIRECT_URL: "http://tvoykostanay.kz/auth/google/callback",

	FACEBOOK_URL: "https://www.facebook.com/v4.0/dialog/oauth",
	FACEBOOK_APP_ID: "983579216425078",
	FACEBOOK_APP_SECRET: "6eb32226c5be7e629cfd3ada0da31a26",
	FACEBOOK_REDIRECT_URL: "https://0669-188-130-157-73.ngrok-free.app",

	MAIL_LOGIN: "tvoykostanay@gmail.com",
	MAIL_PASSWORD: "ppbuqezeczzvjhol",

	LETTER_FROM: "Tvoykostanay.kz",

	VERIFICATION_FROM: "tvoykostanay.kz",
	VERIFICATION_SUBJECT: "Верификация аккаунта на портале Tvoykostanay",
	VERIFICATION_TEXT: "Для верификации перейдите по ссылке: https://tvoykostanay.kz/auth/verify/",

	RESET_FROM: "Tvoykostanay.kz",
	RESET_SUBJECT: "Сброс пароля на портале Tvoykostanay",
	RESET_TEXT: "Для сброса пароля перейдите по ссылке: https://tvoykostanay.kz/auth/reset/",

	SALT_ROUNDS: 10,

	OK: 1,
	INFO: 2,
	BAD: 3
}

module.exports = env
