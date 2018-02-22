import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchTasks, updateTask, createTask, deleteTask } from '../api/tasks'
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


				tasks[id] = res.task

				this.setState({
					tasks: tasks
				})
			})
			.catch(e => {
				console.log(e)
			})
		})
	}

	// handleComplete(listID, taskID, complete){
	// 	let markComplete
    //
	// 	if (complete === false){
	// 		markComplete = true
	// 		updateTask(listID, taskID, markComplete)
	// 	} else {
	// 		markComplete = false
	// 		updateTask(listID, taskID, markComplete)
	// 	}
    //
	// }
    // onClick={this.handleComplete(listID, taskID, complete).bind(this)}

	renderComplete(listID, taskID, complete){
		if(complete === true){
			return (
				<button className="button-task-completed">
					Completed
				</button>
			)
		} else {
			return (
				<button className="button-task">
					Incomplete
				</button>
			)
		}
	}

	removeList(id){
		// console.log("gone");
		deleteList(id)
	}

	render() {
		let { user, lists } = this.props
		let { tasks } = this.state
		console.log(tasks);

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
									<div className="list-header">
										<h3>{list.title}</h3>
										<div className="list-buttons">
											<button className="button-submit space">
												Edit List
											</button>
											<button
												className="button-submit space"
												onClick={this.removeList.bind(this, list.id)}
											>
												Delete List
											</button>
										</div>
									</div>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Collapse>
									<Panel.Body>
										<div className="list-type">
											<h4><strong>List Type: </strong>{list.type}</h4>
										</div>
										{!tasks[list.id] ? (
											<p>Loading ...</p>
										) : (
												tasks[list.id].map((task) => (
													<div className="task-display">
														<div className="table container">
															<table key={list.id}>
															  <thead>
																<tr>
																	<th>Task</th>
																	<th>Description</th>
																	<th>Is Complete</th>
																</tr>
															  </thead>
															  <tbody>
																<tr>
																	<td>{task.task}</td>
																	<td>{task.desc}</td>
																	<td>
																		{this.renderComplete(list.id, task.id, task.isComplete)}
																	</td>
																</tr>
															  </tbody>
															</table>
														</div>
														<div className="button-grp-tasks">
															<button className="button-task">
																Edit Task
															</button>

															<button className="button-task">
																Delete Task
															</button>
														</div>
													</div>
												))
											)
										}
										<div className="create-task">
											<AddTask listId={list.id}/>
										</div>
									</Panel.Body>
								</Panel.Collapse>
							</Panel>
							))
						}
				</div>
				<div className="dash-components">
					<div className="addList-container">
						<AddList userId={user.id} />
					</div>
					<div className="vendorResults">
						<VendorSearch lists={lists}/>
					</div>
				</div>
			</div>
		)
	}
}

export default UserLists;
