class Session {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	user(token) {
		const { base } = this.settings

		return fetch(`${base}/user?authToken=${token}`)
		.then((res) => {
			return res.json()
		})
		.catch(error => {
			return
		})
	}

	email(loginForm){
		const { base } = this.settings

		return fetch(`${base}/login/${loginForm.email}`)
		.then(res => {
			return res.json()
		})
		.then(parsedRes => {
			//Save response values to local storage
			localStorage.setItem("authToken", parsedRes.token)
			localStorage.setItem("tokenExpiration", parsedRes.expiration)
			return parsedRes.token
		})
	}
}

export default Session
