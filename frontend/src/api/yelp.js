class Yelp {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	get(vendor, location) {
		console.log('We are in yelp')
		const { base } = this.settings

		return fetch(`${base}/yelp/${vendor}/${location}`)
		.then((raw) => {
			return raw.json()
		})
	}
}

export default Yelp
