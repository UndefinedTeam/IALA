import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home'
import Login from './login'
import SignUp from './signup'
import { fetchUser } from '../util/ApiCalls'
import Dashboard from './Dashboard'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: true,
			users: [],
		}
	}

	componentWillMount() {
		this.getUser()
	}

	getUser() {
		fetchUser()
		.then((users) => {
			this.setState({
				users: users,
			})
		})
		.catch(e => { console.log(e) })
	}

	render() {
		let { login, users } = this.state

		console.log(users);

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>

					<Route path='/login' render={(props) => {
						return <Login users={users} />
					}}/>

					<Route path='/register' component={SignUp} />

					<Route path='/dashboard' render={(props) => {
								return (
									<ProtectedPage>
										<Dashboard users={users} />
									</ProtectedPage>
								)
							}
						}
					/>
				</Switch>
			</div>
		)
	}
}

export default Main;

class ProtectedPage extends Component {
	render() {
		const { login, children } = this.props

		if(!login) {
			return (<Redirect to='/login' />)
		}

		return (
			{children}
		)
	}
}
