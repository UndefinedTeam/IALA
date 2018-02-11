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

	// componentWillMount(params){
	// 	const id = this.props.match.params.id
	// 	fetch(`${API}/user/${id}/list`,
	// 		{
	// 			body: JSON.stringify(params),
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			method: "POST"
	// 		}
	// 	)
	// 	.then((rawResponse) => {
	// 		console.log(rawResponse);
	// 		return rawResponse.json()
	// 	})
	// 	.then((parsedResponse) => {
	// 		console.log(parsedResponse)
	// 		const user = Object.assign([], this.state.user)
	// 		const lists = Object.assign([], this.state.lists)
	// 			user.push(parsedResponse.user)
	// 			lists.push(parsedResponse.lists)
	// 		this.setState({
	// 			user: parsedResponse.user,
	// 			lists: parsedResponse.lists
	// 		})
	// 	})
	// }

	render (){
		// console.log("User", this.state.user)
		// console.log("lists", this.state.lists)

		return(
			<div className="dash-container">
				<UserLists />
				<Progress />
				<VendorSearch />
			</div>
		)
	}
}

export default Dashboard;
