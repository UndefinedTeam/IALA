import React, { Component } from 'react';
import UserLists from './UserLists';
import Progress from './Progress';
import Tasks from './tasks';



class TasksDash extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: [],
			lists: [],
			tasks: []
		}
	}

	render (){

		return(
			<div className="dash-container">
				<UserLists />
				<Progress />
				<h1> Hello World</h1>
			</div>
		)
	}
}

export default TasksDash;

