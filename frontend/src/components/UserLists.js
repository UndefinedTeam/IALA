import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchTasks, fetchTask, createTask, deleteTask } from '../api/tasks'
import VendorSearch from './VendorSearch';
import AddList from './AddList';
import AddTask from './AddTask';


class UserLists extends Component {
	constructor(props){
		super(props)

		this.state = {
			tasksClicked: false,
			newTaskSuccess: false,
		}
	}

	componentWillMount(){
		let { lists } = this.props
		let listId
		Object.keys(lists).map((list, index) => {
			listId = list[index].id
		}
		this.getTasks(listId)
	}

	getTasks(id){
		fetchTasks(id)
		.then((res) => {
			console.log("fetch-tasks", res.task)
			Object.keys(res.tasks).map((task, index) => {
				return(

				)
			})
		})
		.catch(e => {console.log(e)
		})
	}

	renderAddTask(list){
		console.log("what's my id?", list);
		if(list){
			this.getTasks(list)
			return (
				<AddTask listId={list}/>
			)
		}
	}




    // this is not working! >:|
	// renderButton(list){
	// 	let { tasks, tasksClicked, newTaskSuccess } = this.state
    //
	// 	if(!tasks){
	// 		return (
	// 				<div className="button">
	// 					<button
	// 						type="add"
	// 						onClick={this.renderAddTask(list)} >
	// 							Add Task
	// 					</button>
	// 				</div>
	// 		)
	// 	} else if (tasksClicked === true){
	// 		return (
	// 			this.renderAddTask(list)
	// 		)
	// 	} else {
	// 		return (
	// 			this.renderAddTask(list)
	// 		)
	// 	}
	// }


	render() {
		let { user, lists } = this.props

		if(!user) {
			return (
				<h1>Loading...</h1>
			)
		}
        // User lists show up! YAY!
        // TODO: when a user clicks on the view list button the task dash needs to only display tasks from that specific list ** by List id **
        //NOTE: The classNames for list-buttons, addList-container, and vendors-container don't exist yet

		return(
			<div className="userList-container">
				<div>
					<h2> {user.name} &rsquo;s Lists</h2>
					{Object.keys(lists).map((list, index) => {
						return (
							<Panel bsStyle="success" id="collapsible-panel">
								<Panel.Heading key={index}>
									<Panel.Title toggle componentClass="h3">
										<h3>{lists[index].title}</h3>
										<div className="list-buttons">
											<button>Edit List</button>
											<button>Delete List</button>
										</div>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Collapse>
									<Panel.Body>
											<strong>List Type: </strong>{lists[index].type}
										<div>
											<ul>
												<li>{task[index].task}</li>
												<ul>
													<li>{task[index].desc}</li>
													<li>Is Complete: {task[index].isComplete}</li>
												</ul>
											</ul>
										</div>
										{this.renderAddTask(list)}
									</Panel.Body>
								</Panel.Collapse>
							</Panel>
						)
					})}
				</div>
				<div className="addList-container">
					<AddList userId={user.id}/>
				</div>
				<div className="vendors-container">
					<VendorSearch lists={lists}/>
				</div>
			</div>
		)
	}
}

export default UserLists;
