import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Grid, Page, PageHeader, Row, Col, Button, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Tasks from './tasks';
import TodoInput from './TodoInput';
import VendorSearch from './VendorSearch';
import { validatePresence} from '../util/validations';


var tasks = [
  {
		listId: 1,
		type: '0',
		task: 'Task #1',
		priority: 'Low',
		desc: 'Some random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random task',
		isComplete: false,
		dateStart: '',
		dateDone: ''
  },
  {
		todoListId: 1,
		categoryId: 0,
		task: 'Task #2',
		priority: 'High',
		desc: 'Some random much more important task random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random taskSome random task',
		isComplete: false,
		dateStart: '',
		dateDone: ''
  }
]

class TasksDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks
    };
    this.handleAddTask = this.handleAddTask.bind(this);
  }


  handleAddTask(task) {
    this.setState({tasks: [...this.state.tasks, task]});
  }

  handleEditTask(task) {

  }

	handleCompletedTask(task) {

	}

  handleRemoveTask(index) {
    this.setState({
      tasks: this.state.tasks.filter(function(e, i) {
        return i !== index;
      })
    })
  }

  render() {
    return (
      <Grid>
        <PageHeader>
          List Name
        		<h5> All tasks pertaining a specific list Id</h5>
        </PageHeader>

				<Row>
					<Col sm="4" id="tasks-sidebar">
						<TodoInput onAddTask={this.handleAddTask}/>
						<br/>
					</Col>
					<Col sm="8" id="tasks-main">
						<div className="task-list-subheader">
							<img src={require("../images/list-icon.png")} alt="list-icon" />
            	Task Count: <span className="badge badge-pill badge-primary">{this.state.tasks.length}</span>
            	<Button className="edit-btn btn-warning btn-sm float-right">
              	<Link to={`/tasks/${tasks.id}/edit`}>Edit List</Link>
            	</Button>
          	</div>
							<ul className="list-group">
								{ this.state.tasks.map((task, index) =>
									<li className="list-group-item" key={index}>
									<button className="btn btn-danger btn-sm float-right" id="remove-task-btn"
										onClick={this.handleRemoveTask.bind(this, index)}><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>x</button>
									<h4 className="list-group-item-heading">{task.task}</h4>
									<small>PRIORITY: <span className="badge badge-secondary">{task.priority}</span></small>
										<p className="text-justify">{task.desc}</p>
									<Checkbox onChange={this.handleCompletedTask.bind(this,index)}>Mark Completed</Checkbox>
									</li>
								)}
							</ul>
					</Col>
				</Row>
				<div>
				<VendorSearch />
				</div>

      </Grid>
    );
  }
}


export default TasksDash;
