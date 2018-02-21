function fetchVendors(vendor, location) {
	return fetch(`/${vendor}/${location}`)
	.then((raw) => {
		return raw.json()
	})
}


module.exports = {
	fetchVendors: fetchVendors,
}
