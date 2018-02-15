import React, { Component } from 'react'
import { fetchUser, fetchUserLists, fetchListTasks } from '../util/ApiCalls'
import UserLists from './UserLists'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			users: [],
			lists: [],
			tasks: [],
		}
		this.getUser()
	}



	// componentDidMount(){
	// 	this.setListDetails()
	// }

	getUser() {
		const { token, users } = this.props
		fetchUser(token)
		.then((users) => {
			console.log("Users in get user:", users.user);
			this.setState({
				users: users.user,
			})
		})
		.catch(e => { console.log(e) })
	}

	getLists(){
		const { id } = this.props.users
		fetchUserLists(id)
		.then((lists) => {
			this.setState({
				lists: lists.lists[0],
			})
		})
		.catch(e => {console.log(e) })
	}

	getTasks(listId){
		fetchListTasks(listId)
		.then((tasks) => {
			this.setState({
				tasks: tasks.tasks[0],
			})
		})
		.catch(e => {console.log(e) })
	}

	// setUserDetails(token) {
	// 	this.getUser(token)
	// }

	// setListDetails(){
	// 	let { users, lists } = this.state
	// 	let id = users.id
	// 	console.log("this is the user id:", id);
	// 	let listId = lists.id
	// 	this.getLists(id)
	// 	this.getTasks(listId)
	// }

	render() {
		let { users, lists, tasks } = this.state
		console.log("Users in render:", users);
		console.log("Lists in render:", lists);
		console.log("Tasks in render:", tasks);
		return(
			<div className="dash-container">
				<UserLists
					user={users}
					lists={lists}
					tasks={tasks}
				/>
				<div className="vendorResults">
					<VendorSearch id={2}/>
				</div>
			</div>
		)
	}
}

export default Dashboard
