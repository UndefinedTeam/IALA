import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Dashboard from './Dashboard'
import TaskDash from './tasksDash'


const API = "http://localhost:3001"

class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			login: false,
			users: [],
		}
	}

	//Pass this function to login as prop
	// loginRoute() {
	// 	this.setState({login: true})
	// }

	componentWillMount() {
		fetch(`${API}/users`)

		.then((rawResponse) => {
			return rawResponse.json()
		})

		.then((res) => {
			// console.log("Response from API:", res);
			return res.json()

		})
		.then((res) => {
			this.setState({users: res.users})
		})
	}
	

	render() {
		let { login, users } = this.state
		console.log("Users in main:", users)
		return (
			<div>

				<Switch>
					<Route exact path='/' component={Home}/>
					{ login && <Redirect from='/login' to='/dashboard' />}
					<Route path='/login' render={(props)=>
						<Login
							users={users}
							loginRoute={this.loginRoute.bind(this)}
						/>
					}/>

					<Route path='/register' component={SignUp}/>
					<Route path='/dashboard' component={Dashboard}/>
					<Route path='/tasks-dash' component={TaskDash}/>

					<Route path='/register' render={(props)=>
						<SignUp
							api={API}
						/>
					}/>

					<Route path='/dashboard' render={(props) => {
								 if(login && users.length > 0){
									 return <Dashboard
		 								users={users}
		 								api={API}
		 							/>
								}  else {
									return <Login
										message={<strong>Please login</strong>}
									/>
								}
							}
						}
					/>

				</Switch>
			</div>
		)
	}
}

export default Main;
