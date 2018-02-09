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

		// Checks for empty fields
		if (email === "" || psw === ""){
			this.setState({error: "Invalid login information"})
		}
		console.log(users);

		for(let i=0; i < users.length; i++) {
			if(email === users[i].email && psw === users[i].password){
				isValid = true;
			}
		}

		if(isValid) {
			console.log("success");
		}

	}

	render (){
		return (
			<div className='form-container'>
				<h3>Welcome back to IALA!</h3>
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
