import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Dashboard from './Dashboard'
import TaskDash from './tasksDash'

const API = "http://localhost:3001"

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: false,
			users: [],
			authToken: this.getToken()
		}
	}

	// Retrieve token and expiration from browser
	// Nullify auth token if past expire date
	getToken() {
		let token = localStorage.getItem('authToken')
		let expire = new Date(localStorage.getItem("tokenExpiration"))
		var today = new Date()
		if(today.getTime() > expire.getTime()) {
			return null
		} else {
			return token
		}
	}

	// Passes login form, calls login POST endpoint
	// New auth token and store to local storage
	// Redirect to dashboard after login
	loginRoute(loginForm) {
		// Send data from log in form
		fetch(`${API}/login`,
		{
			body: JSON.stringify(loginForm),
			headers: {
				'Content-Type':'application/json'
			},
			method: "POST"
		})
		.then(() => {
			fetch(`${API}/login/${loginForm.email}`)
			.then(response => {
				return response.json()
			})
			.then(parsedResponse => {
				//Save response values to local storage
				localStorage.setItem("authToken", parsedResponse.token)
				localStorage.setItem("tokenExpiration", parsedResponse.expiration)
				this.setState({
					authToken: parsedResponse.token
				})
			})
			.catch(error => {console.log("Unable to log in")})
		})
		.catch(error => {
			console.log("Unable to set auth token");
		})
	}


	render() {
		let { login, users, authToken } = this.state

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					{login && <Redirect from='/login' to='/dashboard' />}
					<Route path='/login' render={(props) =>
						 <Login
						 	loginRoute={this.loginRoute.bind(this)}
						  />
					}/>

					<Route path='/dashboard' render={(props) =>
						<Dashboard
							token={authToken}
						/>
					}/>

					<Route path='/register' component={SignUp}/>
					<Route path='/tasks-dash' component={TaskDash}/>

				</Switch>
			</div>
		)
	}
}

export default Main;

// class ProtectedPage extends Component {
// 	render() {
// 		const { login, children } = this.props
//
// 		if(!login) {
// 			return (<Redirect to='/login' />)
// 		}
//
// 		return (
// 			{children}
// 		)
// 	}
// }
// <Route path='/dashboard' render={(props) => {
// 			return (
// 				<ProtectedPage>
// 					<Dashboard users={users} />
// 				</ProtectedPage>
// 			)
// 		}
// 	}
// />
