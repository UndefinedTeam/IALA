class Yelp {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	get(vendor, location) {
		const { base } = this.settings

		return fetch(`${base}/yelp/${vendor}/${location}`)
		.then((raw) => {
			console.log(raw)
			return raw.json()
		})
	}
}

export default Yelp
