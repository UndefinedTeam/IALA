import React, { Component } from 'react';

class Login extends Component {
	constructor(){
		super()
		this.state = {
			form: {
				email: "",
				psw: ""
			},
			error: ""
		}
	}

	//Calls loginRoute to set login state as true and route to dashboard
	loginRoute(){
		this.props.loginRoute();
	}

	//Sets user input form to state
	handleChange(e){
		const formState = Object.assign({}, this.state.form)
  		formState[e.target.name] = e.target.value
  		this.setState({form: formState})
	}

	// Checks user inputs on submit
	handleSubmit(e){
		const	{ loginRoute, login } = this.props
		loginRoute(this.state.form)
		if(!login) {
			this.setState({
				message: "Invalid email or password"
			})
		}
	}

	render (){

		return (
			<div className='form-container'>
				<h3>Welcome back to IALA!</h3>

					<form>

						<div className='form-input'>
							<input type="text" name='email' placeholder="Email" onChange={this.handleChange.bind(this)}></input>
						</div>

						<div className='form-input'>
							<input type="password" name='password' placeholder="Password" onChange={this.handleChange.bind(this)}></input>
						</div>

						<div style={{textAlign:"center"}}>
							{this.state.error}
						</div>
						<h5 style={{'color':'red'}}>{this.state.message}</h5>
						<div className="button">
							<button
								className="button-submit"
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
