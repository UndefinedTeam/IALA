import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { fetchUserLists } from '../api/lists'
import UserLists from './UserLists'
import TaskDash from './TaskDashboard'
//import VendorSearch from './VendorSearch'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			lists: "",
		}
	}

	componentDidMount(){
		let { user } = this.props
		this.getLists(user.id)
	}

	getLists(id){
		fetchUserLists(id)
		.then((res) => {
            console.log("fetch", res.lists)
            this.setState({
                lists: res.lists,
            })
        })
        .catch(e => {console.log(e)
		})
	}



	render() {
		let { lists } = this.state
		let { user } = this.props

		return(
			<Switch>
				<div className="dash-container">
					<Route exact path='/dashboard' render={(props) =>
						<UserLists user={user}/>
					}/>
					<Route path='/dashboard/tasks' render={(props) =>
						<TaskDash user={user} lists={lists} />
					}/>
				</div>
			</Switch>
		)
	}
}

export default Dashboard
