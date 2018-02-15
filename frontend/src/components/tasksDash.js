import React, { Component } from 'react';
import UserLists from './UserLists';

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
			<div>

					<Tasks />

				</div>
		)
	}
}

export default TasksDash;
