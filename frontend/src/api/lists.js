class Lists {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {
			
		})
	}

	all(id) {
		const { base } = this.settings

		return fetch(`${base}/user/${id}/lists`)
		.then((res) => {
			return res.json()
		})
	}

	create(params, id) {
		const { base } = this.settings

		return fetch(`${base}/user/${id}/lists`, {
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

	delete(id) {
		const { base } = this.settings

		return fetch(`${base}/list/${id}`, {
			method: "DELETE"
		})
	}

}

export default List
