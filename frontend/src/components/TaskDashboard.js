import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Page, PageHeader, Row, Col, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { fetchTasks, fetchTask, createTask, deleteTask } from '../api/tasks'
import TaskInput from './TaskInput';
import VendorSearch from './VendorSearch';
import { validatePresence } from '../util/validations';


class TasksDash extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: []
		}

	}


	render() {
		let { user } = this.props
		let { list, tasks} = this.state

		return (
			<Grid>
				<PageHeader>
					{list.title}
				</PageHeader>

				<Row>
					<Col sm={4} id="tasks-sidebar">
						<TaskInput onAddTask={this.handleAddTask}/>
						<br/>
					</Col>
					<Col sm={8} id="tasks-main">
						<div className="task-list-subheader">
							<img src={require("../images/list-icon.png")} alt="list-icon" />
							Task Count: <span className="badge badge-pill badge-primary">{this.state.tasks.length}</span>
							<Button className="edit-btn btn-warning btn-sm float-right">
								<Link to={`/tasks/${tasks.id}/edit`}>Edit Task</Link>
							</Button>
						</div>
						<ul className="list-group">
						{ this.state.tasks.map((task, index) =>
						<li className="list-group-item" key={index}>
							<button
								className="btn btn-danger btn-sm float-right"
								id="remove-task-btn"
								onClick={this.handleRemoveTask.bind(this, index)}>
								<span><i className="fa fa-trash-o" aria-hidden="true"></i>
								</span>x</button>

							<h4 className="list-group-item-heading">{task.task}</h4>
							<small> PRIORITY: <span className="badge badge-secondary">{task.priority}</span></small>
							<p className="text-justify">{task.desc}</p>

							<Checkbox
								//onChange handle
							>Mark Completed</Checkbox>

						</li>
					)}
					</ul>
					<VendorSearch user={user} />
				</Col>
			</Row>
		</Grid>
		);
	}
}
export default TasksDash;
