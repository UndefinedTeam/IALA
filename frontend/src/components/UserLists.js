import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import api from '../api'
import VendorSearch from './VendorSearch';
import AddList from './AddList';
import AddTask from './AddTask';

const { Tasks, Lists } = api()

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
			Tasks.all(id)
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

// Not working! Yet
	handleComplete(e){
		let clicked
		if (e){
			clicked = true
		} else {
			clicked = false
		}
		return clicked
	}

// Not working! Yet
	renderComplete(clicked){

		if(clicked === true){
			return (
				<button
					className="button-task-completed"
					onClick={this.handleComplete.bind(this)}
				>
					Completed
				</button>
			)
		} else {
			return (
				<button
					className="button-task"
					onClick={this.handleComplete.bind(this)}
				>
					Incomplete
				</button>
			)
		}
	}


	removeList(id){
		Lists.delete(id)
		this.refreshPage()
	}

	removeTask(id){
		Tasks.delete(id)
		this.refreshPage()
	}

	refreshPage(){
		this.props.refreshLists()
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
							<Panel key={list.id} id="collapsible-panel">
								<Panel.Heading>
									<Panel.Title toggle componentClass="h3">
									<div className="list-header">
										<h3>{list.title}</h3>
										<div className="list-buttons">
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
									<Panel.Body className="list-panel">
										<div className="list-type">
											<h4><strong>List Type: </strong>{list.type}</h4>
										</div>
										<div className="task-stuff">
											{!tasks[list.id] ? (
												<h3>Loading ...</h3>
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
																			{this.renderComplete()}
																		</td>
																	</tr>
																  </tbody>
																</table>
															</div>
															<div className="button-grp-tasks">

																<button
																	className="button-task" onClick={this.removeTask.bind(this, task.id)}
																>
																	Delete Task
																</button>
															</div>
														</div>
													))
												)
											}
											<div className="create-task">
												<AddTask
													listId={list.id}
													refreshTasks={this.refreshPage.bind(this)}
												/>
											</div>
										</div>
										</Panel.Body>
									</Panel.Collapse>
								</Panel>
								))
							}
				</div>
				<div className="dash-components">
					<div className="addList-container">
						<AddList userId={user.id} getTasks={this.getTasks.bind(this)}
						refreshLists={this.refreshPage.bind(this)}/>
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
