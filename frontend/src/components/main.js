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
			login: false
		}
	}

	componentWillMount() {
		fetch(`${API}/`)
	}

	//Pass in login form, calls login POST endpoint
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
			.then(token => {
				console.log("hi", loginForm.email, token.authToken);
				localStorage.setItem("authToken", token.authToken)
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
