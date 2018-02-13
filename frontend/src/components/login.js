import React, { Component } from 'react';

class Login extends Component {
	constructor(){
		super()
		this.state = {
			email: "",
			psw: "",
			error: ""
		}
	}

	//Calls loginRoute to set login state as true and route to dashboard
	loginRoute(){
		this.props.loginRoute();
	}

	//Sets user input email to state
	handleEmail(e){
		this.setState({email: e.target.value})
	}

	//Sets user input password to state
 	handlePsw(e){
		this.setState({psw: e.target.value})
	}

	// Checks user inputs on submit
	handleSubmit(e){
		const	{ users } = this.props
		const { email, psw } = this.state

		let isValid = false;

		for(let i=0; i < users.length; i++) {
			if(email === users[i].email && psw === users[i].password){
				isValid = true;
			}
		}

		if(isValid) {
			this.setState({error: ""})
			this.loginRoute();
		} else {
			this.setState({error: "Invalid login"})
		}

	}

	render (){
		const { message } = this.props
		return (
			<div className='form-container'>
				<h3>Welcome back to IALA!</h3>
					<p>{message}</p>
					<form>

						<div className='form-input'>
							<input type="text" name='email' placeholder="Email" onChange={this.handleEmail.bind(this)}></input>
						</div>

						<div className='form-input'>
							<input type="password" name='password' placeholder="Password" onChange={this.handlePsw.bind(this)}></input>
						</div>

						<div style={{textAlign:"center"}}>
							{this.state.error}
						</div>

						<div className= "button">
							<button
								id="submit"
								type="button"
						 		onClick={this.handleSubmit.bind(this)}
							> Login </button>
						</div>

					</form>
			</div>
		)
	}
}

export default Login;
