import React, { Component } from 'react'
import { getUserLists, getUserTasks } from '../util/ApiCalls'
import UserLists from './UserLists'
import Progress from './Progress'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			lists: [],
			tasks: [],
		}
	}

	componentWillMount() {
		this.setUserDetails()
	}

	setUserDetails() {
		let { users } = this.props
		let { list } = this.state
		let id = users.id
		let listId = this.state.list.id

		let lists = getUserLists(id)

		this.setState({
			lists: lists
		})

		let tasks = getUserTasks(listId)

		this.setState({
			tasks: tasks
		})
	}

	render() {
		const { users } = this.props
		let { lists, tasks } = this.state

		return(
			<div className="dash-container">
				<UserLists
					user={users}
					lists={lists}
					tasks={tasks} />
				<Progress />
				<div className="vendorResults">
					<VendorSearch />
				</div>
			</div>
		)
	}
}

export default Dashboard
