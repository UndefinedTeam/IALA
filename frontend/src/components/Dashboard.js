import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { fetchUserLists } from '../api/lists'
import UserLists from './UserLists'

class Dashboard extends Component {
	constructor(props){
		super(props)

		this.state = {
			lists: "",
			newTask: false
		}
	}

	componentDidMount(){
		let { user } = this.props
		if (!user) {
			return
		}
		this.getLists(user.id)
	}

	getLists(id){
		fetchUserLists(id)
		.then((res) => {
            // console.log("fetch", res.lists)
            this.setState({
                lists: res.lists,
            })
        })
        .catch(e => {
			// console.log(e)
		})
	}

	render() {
		let { lists } = this.state
		let { user } = this.props

		return(
			<Switch>
				<div className="dash-container">
					<Route exact path='/dashboard' render={(props) =>
						(<UserLists user={user} lists={lists} />)
					}/>
				</div>
			</Switch>
		)
	}
}

export default Dashboard
