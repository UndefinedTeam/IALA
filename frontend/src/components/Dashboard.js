import React, { Component } from 'react'
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

	// componentWillMount(){
	// 	let { user, api } = this.props
	// 	console.log(this.props);
	// 	let id = user.id
	// 	console.log("Users in Dash:", this.props)
   //
	// 	fetch(`${api}/users/${id}/list`)
	// 	.then((res) => {
	// 		console.log("Lists:",res)
	// 		return res.json()
	// 	})
	// 	.then((res) => {
	// 		this.setState({
	// 			lists: res.lists
	// 		})
	// 	})
	// 	.catch((err) => {
	// 		console.log("List Error:",err)
	// 		return err
	// 	})
   //
	// 	fetch(`${api}/lists/${id}/tasks`)
	// 	.then((res) => {
	// 		console.log("tasks:", res)
	// 		return res.json()
	// 	})
	// 	.then((res) => {
	// 		this.setState({
	// 			tasks: res.tasks
	// 		})
	// 	})
	// 	.catch((err) => {
	// 		console.log("Task Error:", err)
	// 		return err
	// 	})
	// }

	render() {
		const  users = "test"
		let lists, tasks = "test"

		return(
			<div className="dash-container">
				<UserLists
					user={users}
					lists={lists}
					tasks={tasks} />
				<Progress />
				<div className="vendorResults">
					<VendorSearch id={2}/>
				</div>
			</div>
		)
	}
}

export default Dashboard
