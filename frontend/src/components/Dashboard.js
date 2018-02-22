import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Lists } from '../api'
import UserLists from './UserLists'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			lists: "",
			newTask: false
		}
	}

	componentWillReceiveProps(props){
		let user = props.user
		if (!user) {
			return
		}
		this.getLists(user.id)
	}

	componentDidMount(){
		let { user } = this.props
		if (!user) {
			return
		}
		this.getLists(user.id)
	}

	getLists(id){
		Lists.all(id)
		.then((res) => {
			this.setState({
				lists: res.lists,
			})
		})
		.catch(e => {
		})
	}

	refreshLists(){
		let { user } = this.props
		if (!user) {
			return
		}
		this.getLists(user.id)
	}

	render() {
		let { lists } = this.state


		let { user } = this.props

		return(
			<Switch>
				<div className="dash-container">
					<Route exact path='/dashboard' render={(props) =>
						(<UserLists user={user} lists={lists} refreshLists={this.refreshLists.bind(this)}/>)
					}/>
				</div>
			</Switch>
		)
	}
}

export default Dashboard
