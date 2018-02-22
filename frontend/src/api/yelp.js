class Yelp {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	get(vendor, location) {
		const { base } = this.settings

		return fetch(`/${base}/${vendor}/${location}`)
		.then((raw) => {
			return raw.json()
		})
	}
}

export default Yelp
