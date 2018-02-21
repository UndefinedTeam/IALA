function loginUser(loginForm){
	return fetch(`/login`, {
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
	return fetch(`/user`, {
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
