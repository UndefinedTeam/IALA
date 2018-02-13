import React, { Component } from 'react';
import UserLists from './UserLists';
import Progress from './Progress';
import VendorSearch from './VendorSearch';


const API = "http://localhost:3001"

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			user: [],
			lists: []
		}
	}

	render (){
		// console.log("User", this.state.user)
		// console.log("lists", this.state.lists)

		return(
			<div className="dash-container">
				<UserLists />
				<Progress />
				<div className="vendorResults">
					<VendorSearch />
				</div>
			</div>
		)
	}
}

export default Dashboard;
