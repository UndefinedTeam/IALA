import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import UserLists from './UserLists'
import Tasks from './tasks'
//import VendorSearch from './VendorSearch'

class Dashboard extends Component {

	render() {
		let { user } = this.props
		console.log(user);

		return(
			<Switch>
				<div className="dash-container">
					<Route exact path='/dashboard' render={(props) =>
						<UserLists user={user}/>
					}/>
					<Route path='/dashboard/tasks' render={(props) =>
						<Tasks user={user} />
					}/>
				</div>
			</Switch>
		)
	}
}

export default Dashboard
