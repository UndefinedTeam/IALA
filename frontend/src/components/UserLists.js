import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { fetchTasks, fetchTask, createTask, deleteTask } from '../api/tasks'
import VendorSearch from './VendorSearch';
import AddList from './AddList';
import AddTask from './AddTask';


class UserLists extends Component {
	constructor(props){
		super(props)

		this.state = {
			tasks: [],
			tasksClicked: false,
			newTaskSuccess: false,
		}
	}

	getTasks(id){
		fetchTasks(id)
		.then((res) => {
			console.log("fetch-tasks", res.tasks)
			this.setState({
				tasks: res.tasks,
			})
		})
		.catch(e => {console.log(e)
		})
	}

	renderAddTask(list){
		console.log("what's my id?", list);
		if(list){
			return (
				<AddTask listId={list}/>
			)
		}
	}

	taskItems(){
		let { tasks } = this.state
		console.log("here are the tasks", tasks)
		Object.keys(tasks).map((task, index) => {
			<ul>
				<li>task[index].task</li>
				<ul>
					<li>task[index].desc</li>
					<li>task[index].dateStart</li>
					<li>task[index].isComplete</li>
				</ul>
			</ul>
		})
	}

	renderButton(list){
		let { tasks, tasksClicked, newTaskSuccess } = this.state

		if(tasks){
			return (
				<div>
					<div>
						<ul>{this.taskItems()}</ul>
					</div>
					<div className="button">
						<button
							type="add"
							onClick={this.renderAddTask()} >
								Add Task
						</button>
					</div>
				</div>
			)
		} else if (!tasks && tasksClicked === true){
			return (
				this.renderAddTask(list)
			)
		} else {
			return (
				this.renderAddTask(list)
			)
		}
	}


	render() {
		let { user, lists } = this.props
		console.log(user);
		console.log(lists);
		if(!user) {
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
					{/*
						Created an if else statement so the user dashboard would still show up for users without any todo lists
						*/}
					{lists ?Object.keys(lists).map((list, index) => {
						return (
							<Panel bsStyle="success" id="collapsible-panel">
								<Panel.Heading key={index}>
									<Panel.Title toggle componentClass="h3">
										<h3>{lists[index].title}</h3>
										<div className="button">
											<button>Edit List</button>
											<button>Delete List</button>
										</div>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Collapse>
									<Panel.Body>
											<strong>List Type: </strong>{lists[index].type}
										{this.renderButton(list)}
									</Panel.Body>
								</Panel.Collapse>
							</Panel>
						)
					}):<h1>Create a list to get started</h1>}
				</div>
				<div>
					<AddList userId={user.id}/>
				</div>
				<div className="vendorResults">
					<VendorSearch lists={lists}/>
				</div>
			</div>
		)
	}
}

export default UserLists;
