
const API = "http://localhost:3001"

function loginUser(loginForm){
	return fetch(`${API}/login`, {
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

function addNewUser(params){
	return fetch(`${API}/user`, {
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



module.exports = {
    addNewUser: addNewUser,
	loginUser: loginUser,
}
