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

	loginRoute(params) {
		fetch(`${API}/login`,
			{
				body: JSON.stringify(params),
				headers: {
					'Content-Type':'application/json'
				},
				method: "POST"
			}).then((parsedResponse) => {
				console.log(parsedResponse);
				this.setState({users: parsedResponse.user})
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
