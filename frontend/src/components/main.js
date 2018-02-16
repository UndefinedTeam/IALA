import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import  { fetchUser } from '../util/ApiCalls'
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Dashboard from './Dashboard'



const API = "http://localhost:3001"

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: false,
			user: {},
			authToken: this.getToken()
		}
	}

	componentDidMount(){
		this.getUser()
	}

	getUser() {
		let token = this.getToken()

		if(!token) {
			return
		}

		fetchUser(token)
		.then((res) => {
			console.log('fetch', res.user);
			if(res.user) {
				this.setState({
					user: res.user,
					login: true
				})
			} else {
				this.setState({
					login: false
				})
			}
		})
		.catch(error => {
			this.setState({
				login: false
			})
		})
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
		.then(()=> {
			fetch(`${API}/login/${loginForm.email}`)
			.then(response => {
				return response.json()
			})
			.then(parsedResponse => {
				//Save response values to local storage
				let token = parsedResponse.token
				localStorage.setItem("authToken", token)
				localStorage.setItem("tokenExpiration", parsedResponse.expiration)

				this.setState({
					login: true,
					user: this.getUser(token),
					authToken: parsedResponse.token
				})
			})
			.catch(error => {console.log("Set auth token")})
		})
		.catch(error => {
			console.log("Unable to log in");
		})
	}

	render() {
		const { login, authToken, user } = this.state

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/register' component={SignUp}/>

					{login &&
						<Switch>
							<Redirect from="/login" to="/dashboard" />
							<Route path='/dashboard' render={(props) =>
								<Dashboard
									user={user}
									token={authToken}
								/>
							}/>
						</Switch>
					}
					{!login &&
						<Switch>
							<Route path='/dashboard' render={(props) =>
								 <Login loginRoute={this.loginRoute.bind(this)} />
							}/>
							<Route path='/login' render={(props) =>
								 <Login loginRoute={this.loginRoute.bind(this)} />
							}/>
						</Switch>
					}
				</Switch>
			</div>
		)
	}
}

export default Main;
