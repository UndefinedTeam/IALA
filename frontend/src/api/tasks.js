
const API = "http://localhost:3001"

function fetchTasks(listId){
    return fetch(`${API}/list/${listId}/tasks`)
    .then((res) => {
        console.log("Tasks:", res)
        return res.json()
    })
}

function createTask(listId, params){
    return fetch(`${API}/list/${listId}/tasks`, {
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

function fetchTask(listId, taskId){
    return fetch(`${API}/list/${listId}/tasks/${taskId}`)
    .then((res) => {
        console.log("Task:", res)
        return res.json()
    })
}

function updateTask(listId, taskId, params){
	return fetch(`${API}/list/${listId}/tasks/${taskId}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params),
	})
}

// in process
// function deleteTask(listId){
//
// }

module.exports = {
    fetchTasks: fetchTasks,
	fetchTask: fetchTask,
	createTask: createTask,
}
