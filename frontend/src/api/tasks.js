function fetchTasks(listID){
	return fetch(`/list/${listID}/tasks`)
	.then((res) => {
	//console.log("Tasks:", res)
	return res.json()
})
}

function createTask(listID, params){
	return fetch(`/list/${listID}/tasks`, {
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
	return fetch(`/list/${listID}/tasks/${taskID}`)
	.then((res) => {
		console.log("Task:", res)
		return res.json()
	})
}

function updateTask(listID, taskID, params){
	return fetch(`/list/${listID}/tasks/${taskID}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params),
	})
}

function deleteTask(id){
	return fetch(`/tasks/${id}`, {
		method: "DELETE"
	})
}

module.exports = {
	fetchTasks: fetchTasks,
	fetchTask: fetchTask,
	createTask: createTask,
	deleteTask: deleteTask
}
