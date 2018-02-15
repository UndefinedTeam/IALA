import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import  { fetchUser } from '../util/ApiCalls'
import Home from './home'
import Login from './login'
import SignUp from './signup'
import Dashboard from './Dashboard'
<<<<<<< HEAD
import TasksDash from './tasksDash'
import AddList from './AddList'
=======
import Tasks from './tasks'
>>>>>>> master

const API = "http://localhost:3001"

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: false,
			user: this.getUser(),
			authToken: this.getToken()
		}
	}

	getLogin(){
		let token = localStorage.getItem('authToken')
		this.fetchUser()
		.then(res => {
			if(res.user){
				console.log("yes");
				return true
			} else {
				return false
			}
		})
	}

	getUser(){
		fetchUser()
		.then((user) => {
			console.log(user);
			return user
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
				localStorage.setItem("authToken", parsedResponse.token)
				localStorage.setItem("tokenExpiration", parsedResponse.expiration)
				this.setState({
					users: this.getUser(),
					login: true
				})
			})
			.catch(error => {console.log("Set auth token")})
		})
		.catch(error => {
			console.log("Unable to log in");
		})
	}

	showContent(){
		const { login, authToken, user } = this.state
		console.log(user);
		if(!login) {
			return(
				<div><Redirect from='/login' to='/dashboard' />
				<Route path='/dashboard' render={(props) =>
					<Dashboard
						user={user}
						token={authToken}
					/>
				}/></div>
			)
		} else {
			return (
				<Route path='/login' render={(props) =>
					 <Login
						loginRoute={this.loginRoute.bind(this)}
					  />
				}/>
			)
		}
	}

	render() {
		let { login, user, authToken } = this.state

		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/addlist' render={(props) =>
						<AddList
							user={user}
						/>
					}/>
					{this.showContent()}

					<Route path='/register' component={SignUp}/>
					<Route path='/tasks' component={Tasks}/>
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
// {login && <Redirect from='/login' to='/dashboard' />}
// <Route path='/login' render={(props) =>
// 	 <Login
// 		loginRoute={this.loginRoute.bind(this)}
// 	  />
// }/>
// {login && <Redirect from='/dashboard' to='/login' />}
//
// <Route path='/register' render={(props)=>
// 	<SignUp
// 		api={API}
// 	/>
// }/>
