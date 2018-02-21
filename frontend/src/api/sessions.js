function fetchUser(token) {
    return fetch(`/user?authToken=${token}`)
    .then((res) => {
        return res.json()
    })
}

function checkEmail(loginForm){
	return fetch(`/login/${loginForm.email}`)
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
