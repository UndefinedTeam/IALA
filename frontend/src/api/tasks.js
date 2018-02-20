
const API = "http://localhost:3001"

function fetchTasks(listID){
    return fetch(`${API}/list/${listID}/tasks`)
    .then((res) => {
        console.log("Tasks:", res)
        return res.json()
    })
}

function createTask(listID, params){
    return fetch(`${API}/list/${listID}/tasks`, {
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

function fetchTask(listID, taskID){
    return fetch(`${API}/list/${listID}/tasks/${taskID}`)
    .then((res) => {
        console.log("Task:", res)
        return res.json()
    })
}

function updateTask(listID, taskID, params){
	return fetch(`${API}/list/${listID}/tasks/${taskID}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params),
	})
}

// in process
// function deleteTask(listID){
//
// }

module.exports = {
    fetchTasks: fetchTasks,
	fetchTask: fetchTask,
	createTask: createTask,
}
