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
