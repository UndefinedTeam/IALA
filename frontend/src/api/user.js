class User {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	login(loginForm){
		const { base } = this.settings

		return fetch(`/${base}/login`, {
			method: "POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(loginForm),
		})
		.then((res) => {
			return res.json()
		})
	}

	add(params){
		const { base } = this.settings

		return fetch(`/${base}/user`, {
			method: "POST",
			headers: {
			   'Content-Type': 'application/json'
			},
			body: JSON.stringify(params),
		})
		.then((res) => {
			return res.json()
		})
	}
}
 export default User
