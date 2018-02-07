import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';

class Main extends Component {

	render (){
		return (
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={SignUp}/>
				</Switch>
			</div>
		)
	}
}

export default Main;
