import React, { Component } from 'react'
import { fetchUser, fetchUserLists, fetchListTasks } from '../util/ApiCalls'
import UserLists from './UserLists'
import Progress from './Progress'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			users: [],
			lists: [],
			tasks: [],
		}
	}

	componentWillMount() {
		this.setUserDetails()
	}

	componentDidMount(){
		this.setListDetails()
	}

	getUser() {
		fetchUser()
		.then((users) => {
			console.log("Users in get user:", users.users[0].id);
			this.setState({
				users: users.users[0],
			})
		})
		.catch(e => { console.log(e) })
	}

	getLists(id){
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

	setUserDetails() {

		this.getUser()
	}

	setListDetails(){
		let { users, lists } = this.state
		let id = users.id
		console.log("this is the user id:", id);
		let listId = lists.id
		this.getLists(id)
		this.getTasks(listId)
	}

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
				<Progress />
				<div className="vendorResults">
					<VendorSearch />
				</div>
			</div>
		)
	}
}

export default Dashboard
