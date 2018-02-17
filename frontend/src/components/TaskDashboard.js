import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Page, PageHeader, Row, Col, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { fetchTasks, fetchTask, createTask, deleteTask } from '../api/tasks'
import AddTask from './AddTask';
import VendorSearch from './VendorSearch';
import { validatePresence } from '../util/validations';


class TasksDash extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: []
		}

	}

	componentDidMount(){
		this.getTasks()
	}

	getTasks(){
		let { list } = this.props
		fetchTasks(list.id)
		.then((res) => {
			console.log("fetch", res.tasks)
			this.setState({
				tasks: res.tasks,
			})
		})
		.catch(e => {console.log(e)
		})
	}

    //TODO: Need only one list passed when page is rendered corresponding to the view list click from UserLists component
    // tasks cannot get set because it's getting all the list ids instead of just one...

	render() {
		let { user, list } = this.props
		let { tasks } = this.state

		return (
			<Grid>
				<PageHeader>
					{list.title}
				</PageHeader>
				<Row>
					<Col sm={4} id="tasks-sidebar">
						<AddTask onAddTask={this.handleAddTask}/>
					</Col>
					<Col sm={8} id="tasks-main">
						<div className="task-list-subheader">
							<img src={require("../images/list-icon.png")} alt="list-icon" />
							Task Count:
								<span className="badge badge-pill badge-primary">
									tasks length
								</span>
							<Button className="edit-btn btn-warning btn-sm float-right">
								<Link to={`list/${list.id}/tasks/${tasks.id}/edit`}>
									Edit Task
								</Link>
							</Button>
						</div>

							<div className="list-group">
								{ this.state.tasks.map((task, index) =>
									<div className="list-group-item" key={index}>
										<button
											className="btn btn-danger btn-sm float-right"
											id="remove-task-btn"
											onClick={this.handleRemoveTask.bind(this, index)
										}>
											<span>
												<i className="fa fa-trash-o" aria-hidden="true"></i>
											</span>
												x
										</button>

										<h4 className="list-group-item-heading">
											{task.task}
										</h4>
										<ul>
											<li className="text-justify">{task.type}</li>
											<li className="text-justify">{task.desc}</li>
											<li className="text-justify">{task.dateStart}</li>
											<li className="text-justify">{task.dateDone}</li>
										</ul>
										{task.isComplete == true &&
											<Checkbox>
												Mark Completed
											</Checkbox>
										}

										{task.isComplete == false &&
											<Checkbox>
												Mark Completed
											</Checkbox>
										}
									</div>
								)}
							</div>

						<VendorSearch user={user} />
					</Col>
				</Row>
			</Grid>
		);
	}
}
export default TasksDash;
