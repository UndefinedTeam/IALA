import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import Dashboard from './userDash'

const API = "http://localhost:3001"

class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: [],
			login: false,
			authToken: this.getToken()
		}
	}

	//*********************************************************
	//*****   Retrieve token and expiration from browser  *****
	//*****	  	Nullify auth token if past expire date  	*****
	//*********************************************************
	getToken() {
		let token = localStorage.getItem('authToken')
		let expire = new Date(localStorage.getItem("tokenExpiration"))
		var today = new Date()
		if(today.getTime() > expire.getTime()) {
			return null
		} else {
			return token
		}
		return 123
	}

	//*********************************************************
	//***** Passes login form, calls login POST endpoint  *****
	//*****		New auth token and store to local storage  	*****
	//***** 			Redirect to dashboard after login				*****
	//*****			 	༼ つ ◕_◕ ༽つ	It works  ༼ つ ◕_◕ ༽つ   	  *****
	//*********************************************************
	loginRoute(loginForm) {
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
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					{this.state.login && <Redirect from='/login' to='/dashboard' />}
					<Route path='/login' render={()=>
						<Login
							users={this.state.users}
							loginRoute={this.loginRoute.bind(this)}
						/>
					}/>
					<Route path='/register' component={SignUp}/>
					<Route path='/dashboard' component={Dashboard}/>
				</Switch>
			</div>
		)
	}
}

export default Main;
