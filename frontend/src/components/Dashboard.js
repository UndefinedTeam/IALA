import React, { Component } from 'react'
import { fetchUser, fetchUserLists, fetchListTasks } from '../util/ApiCalls'
import UserLists from './UserLists'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			user: [],
			lists: [],
			tasks: [],
		}
		this.getUser()
	}


	getUser() {
		const { token } = this.props
		fetchUser(token)
		.then((user) => {
			console.log("Users in get user:", user.user);
			this.setState({
				user: user.user,
			})
		})
		.catch(e => { console.log(e) })
	}

	getLists(){
		const { id } = this.props.user
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
	// 	let { user, lists } = this.state
	// 	let id = user.id
	// 	console.log("this is the user id:", id);
	// 	let listId = lists.id
	// 	this.getLists(id)
	// 	this.getTasks(listId)
	// }

	render() {
		let { user, lists, tasks } = this.state
		console.log("Users in render:", user);
		console.log("Lists in render:", lists);
		console.log("Tasks in render:", tasks);
		return(
			<div className="dash-container">
				<UserLists
					user={user}
					lists={lists}
					tasks={tasks}
				/>
				<div className="vendorResults">
					<VendorSearch />
				</div>
			</div>
		)
	}
}

export default Dashboard
//id={user.id}
