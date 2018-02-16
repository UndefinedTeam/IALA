
const API = "http://localhost:3001"

function fetchUser(token) {
    return fetch(`${API}/user?authToken=${token}`)
    .then((res) => {
        return res.json()
    })
}

function checkEmail(loginForm){
	return fetch(`${API}/login/${loginForm.email}`)
	.then(res => {
		return res.json()
	})
	.then(parsedRes => {
		//Save response values to local storage
		localStorage.setItem("authToken", parsedRes.token)
		localStorage.setItem("tokenExpiration", parsedRes.expiration)
		return parsedRes.token
	})
}

module.exports = {
	fetchUser: fetchUser,
	checkEmail: checkEmail,
}
