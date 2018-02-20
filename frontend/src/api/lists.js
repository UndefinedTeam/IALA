
const API = "http://localhost:3001"

function fetchUserLists(id){
	return fetch(`${API}/user/${id}/lists`)
	.then((res) => {
		// console.log("Lists:",res)
		return res.json()
	})
}

function createList(params, id){
	return fetch(`${API}/user/${id}/lists`, {
		method: "POST",
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(params),
	})
	.then((res) => {
		// console.log("Success!", res)
		return res.json()
	})
}

function deleteList(id){
	return fetch(`${API}/users/${id}/list`, {
		method: "DELETE"

		})
		.then((res) =>{
			// console.log("It's Gone!")
			return res.json()
		})

	}

//in process
// // function updateList(id, params){
//
// }



module.exports = {
	fetchUserLists: fetchUserLists,
	createList: createList,
}
