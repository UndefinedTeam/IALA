
const API = 'http://localhost:3001/yelp'

function fetchVendors(ven, loc){
	return fetch(`${API}/${ven}/${loc}`)
	.then((resData) => {
		return resData.json()
	})
}


module.export = {
	fetchVendors: fetchVendors,
}
