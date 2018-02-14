import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Dashboard from './Dashboard'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: true,
			users: [],
		}
	}


	render() {
		let { login, users } = this.state

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>

					<Route path='/login' render={(props) => {
						 <Login users={users} />
					}}/>

					<Route path='/register' component={SignUp} />

					<Route path='/dashboard' component={Dashboard} />
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
