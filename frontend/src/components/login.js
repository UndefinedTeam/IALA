import React, { Component } from 'react';

class Login extends Component {

	render (){
		return (
			<div className='form-container'>
				<h3>Welcome back to IALA!</h3>
					<form>
						<div className='form-input'>
							<input type="text" name='email' placeholder="Enter Email"></input>
						</div>
						<div className='form-input'>
							<input type="text" name='password' placeholder="Create Password"></input>
						</div>
						<div className= "button">
							<input type="button" value='Login'></input>
						</div>
					</form>
			</div>
		)
	}
}

export default Login;
