
const API = "http://localhost:3001"

function fetchUser(token) {
    return fetch(`${API}/user?authToken=${token}`)
    .then((res) => {
        return res.json()
    })
}


module.exports = {
	fetchUser: fetchUser,
	
}
