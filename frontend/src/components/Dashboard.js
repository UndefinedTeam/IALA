import React, { Component } from 'react'
import UserLists from './UserLists'
import Progress from './Progress'
import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	render() {
		const { user } = this.props

		return(
			<div className="dash-container">
				<UserLists user={user} />
				<Progress />
				<VendorSearch />
			</div>
		)
	}
}

export default Dashboard
