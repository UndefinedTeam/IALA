class Tasks {
	constructor(settings) {
		this.settings = Object.assign({}, settings, {

		})
	}

	all(listID){
		const { base } = this.settings

		return fetch(`${base}/list/${listID}/tasks`)
		.then((res) => {
		//console.log("Tasks:", res)
		return res.json()
	})
	}

	create(listID, params){
		const { base } = this.settings

		return fetch(`${base}/list/${listID}/tasks`, {
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

	fetch(listID, taskID){
		const { base } = this.settings

		return fetch(`${base}/list/${listID}/tasks/${taskID}`)
		.then((res) => {
			console.log("Task:", res)
			return res.json()
		})
	}

	update(listID, taskID, params){
		const { base } = this.settings

		return fetch(`${base}/list/${listID}/tasks/${taskID}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params),
		})
	}

	delete(id){
		const { base } = this.settings
		return fetch(`${base}/tasks/${id}`, {
			method: "DELETE"
		})
	}
}
export default Tasks
