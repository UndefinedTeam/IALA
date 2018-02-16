import React, { Component } from 'react'
import UserLists from './UserLists'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {

	render() {
		let { user } = this.props

		return(
			<div className="dash-container">
				<UserLists
					user={user}
				/>
			</div>
		)
	}
}

export default Dashboard
//id={user.id}
