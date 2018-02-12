import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import Dashboard from './Dashboard'

const API = "http://localhost:3001"

class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			login: true,
			users: [],
		}
	}

	componentWillMount() {
		this.getUsers()
	}


	getUsers() {
		fetch(`${API}/user`)
		.then((resp) => resp.json())
		.then((resp) => {
			console.log(resp.user);

			this.setState({
				users: resp.user,
			})
		})
	}

	render() {
		let { login, users } = this.state

		let user

		console.log(users.length);

		if(users && users.length > 0) {
			user = users[0]
		}

		console.log("user outside:", user);

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					{login && <Redirect from='/login' to='/dashboard' />}
					<Route path='/login' render={(props) => {
						return <Login
							users={users}
							loginRoute={this.loginRoute.bind(this)}
						/>
					}}/>
					{login && <Route path='/dashboard' render={(props) => {
							return <Dashboard
								API={API}
								user={user}
							/>
						}
					} />}
					<Route path='/register' component={SignUp}/>
				</Switch>
			</div>
		)
	}
}

export default Main;
