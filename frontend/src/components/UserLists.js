import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchTasks, fetchTask, createTask, deleteTask } from '../api/tasks'
import{ deleteList } from '../api/lists'
import VendorSearch from './VendorSearch';
import AddList from './AddList';
import AddTask from './AddTask';


class UserLists extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks: {},
			tasksClicked: false,
			newTaskSuccess: false,
		}
	}

	componentDidMount() {
		this.getTasks(this.props)
	}

	componentWillReceiveProps(props) {
		this.getTasks(props)
	}

	getTasks(props) {
		const { lists } = props

		if(!lists) {
			return
		}

		let listIDs = lists.map(list => list.id)

		listIDs.forEach(id => {
			fetchTasks(id)
			.then((res) => {
				const { tasks } = this.state


				tasks[id] = res.tasks

				this.setState({
					tasks: tasks
				})
			})
			.catch(e => {
				console.log(e)
			})
		})
	}

	deleteTask(id){
		console.log("gone");
		deleteList(id)
		this.getTasks(this.props.user.id)
	}

	render() {
		let { user, lists } = this.props
		console.log("hey hi hello");
		console.log(this.props.lists);
		let { tasks } = this.state
		console.log("what's in state?", tasks);
		console.log("task", tasks[10])

		if(!user || !lists) {
			return (
				<h1>Loading...</h1>
			)
		}

        // User lists show up! YAY!
        // TODO: when a user clicks on the view list button the task dash needs to only display tasks from that specific list ** by List id **

		return(
			<div className="userList-container">
				<div>
					<h2> {user.name} &rsquo;s Lists</h2>

						{lists.map((list) => (
							<Panel key={list.id} bsStyle="success" id="collapsible-panel">
								<Panel.Heading>
									<Panel.Title toggle componentClass="h3">
										<h3>{list.title}</h3>
										<div className="list-buttons">
											<button>Edit List</button>
											<button onClick={this.deleteTask.bind(this, list.id)}>Delete List</button>
										</div>
									</Panel.Title>
								</Panel.Heading>

								<Panel.Collapse>
									<Panel.Body>
										<strong>List Type: </strong>{list.type}
										{!tasks[list.id] ? (
											<p>Loading ...</p>
										) : (
												tasks[list.id].map((task) => (
													<div key={list.id}>
														<p>Task: {task.task}</p>
														<p>Description: {task.desc}</p>
														<p>Is Complete: {task.isComplete ? 'completed' : 'not completed'}</p>
													</div>
												))
											)
										}

											<AddTask listId={list.id}/>
									</Panel.Body>
								</Panel.Collapse>
							</Panel>
							))
						}
				</div>
				<div className="addList-container">
					<AddList userId={user.id} getTasks={this.getTasks.bind(this)}/>
				</div>
				<div className="vendorResults">
					<VendorSearch lists={lists}/>
				</div>
			</div>
		)
	}
}

export default UserLists;

// ListComp pass tasks for just the list then pass tasks[list.id]

// TaskComp

// renderAddTask() {
// 	console.log("what's my id?", list);
// 	if(list) {
// 		this.getTasks(list)
// 		return (
// 			<AddTask listId={list}/>
// 		)
// 	}
// }


	// if (tasks.length > 0) {
	// 	return(
	// 		{tasks.map((task, index) => {
	// 		<ul>
	// 			<li>{task[index].task}</li>
	// 			<ul>
	// 				<li>{task[index].desc}</li>
	// 				<li>Is Complete: {task[index].isComplete}</li>
	// 			</ul>
	// 		</ul>
	// 	})}
	// 	)
	// } else {
	// 	<p>Loading ..</p>
	// }


// this is not working! >:|
// renderButton(list) {
// 	let { tasks, tasksClicked, newTaskSuccess } = this.state
//
// 	if(!tasks) {
// 		return (
// 				<div className="button">
// 					<button
// 						type="add"
// 						onClick={this.renderAddTask(list)} >
// 							Add Task
// 					</button>
// 				</div>
// 		)
// 	} else if (tasksClicked === true) {
// 		return (
// 			this.renderAddTask(list)
// 		)
// 	} else {
// 		return (
// 			this.renderAddTask(list)
// 		)
// 	}
// }
