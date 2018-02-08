import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';

const API = "http://localhost:3001"

class Main extends Component {
	constructor(props){
		super(props)
		this.state = {
			users: []
		}
	}

	componentWillMount() {
		fetch(`${API}/user`)
		.then((rawResponse) => {
			return rawResponse.json()
		})
		.then((parsedResponse) => {
			this.setState({users: parsedResponse.user})
		})
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/login' render={()=><Login users={this.state.users} />} />
					<Route path='/register' component={SignUp}/>
				</Switch>
			</div>
		)
	}
}

export default Main;
