import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import FormInput from './FormInput';
import { addNewUser } from '../util/ApiCalls'
import { validatePresence, validateEmail, validatePassword, confirmPassword, validateZip } from '../util/validations'

class SignUp extends Component {
	constructor(props){
		super(props)
		this.state = {
		form: {
			email: "",
			name: "",
			password: "",
			passwordConfirm: "",
			zip: ""
		},
		errors: [""],
		newUserSuccess: false,
		}
	}

	validateForm(form) {
		let errors = {}

		// Email
		errors = validatePresence(errors, form, 'email')
		errors = validateEmail(errors, form, 'email')

		// Name
		errors = validatePresence(errors, form, 'name')

		// Password
		errors = validatePassword(errors, form, 'password')

		// Password Confirm
		errors = confirmPassword(errors, form, 'passwordConfirm')
		// Zip
		errors = validateZip(errors, form, 'zip')

		return errors
	}

	handleChange(e) {
		const { form } = this.state

		form[e.target.name] = e.target.value
		if(Object.keys(this.validateForm(form).length > 0)) {
			this.setState({
				form: form,
				errors: this.validateForm(form),
				newUserSuccess: false
			})
		} else {
			this.setState({
				form: form,
				errors: this.validateForm(form),
				newUserSuccess: true
			})
		}
	}

	handleSubmit(e) {
		const { form } = this.state
		//console.log(e);
		e.preventDefault()

		if(Object.keys(this.state.errors).length > 0) {
			console.log("nein");
			this.handleNewUser(false)
			return this.state.errors
		} else {
			console.log('ja');
			this.handleNewUser(true)
			addNewUser(form)
		}
	}

	handleInvalid(e) {
		e.preventDefault()
		if(Object.keys(this.state.errors).length > 0) {
			console.log("nein");
			this.handleNewUser(false)
			return this.state.errors
		} else {
			this.handleNewUser(true)
		}
	}

	handleNewUser(status){
		if (status) {
			this.setState({newUserSuccess: status})
			return ("Success! your account has been created")
		} else {
			this.setState({newUserSuccess: status})
			return("Registration failed")
		}
	}

	renderButton(){
		if(this.state.newUserSuccess === true){
			return (
				<button
					id='submit'
					onClick={this.handleSubmit.bind(this)}>
					<Link to='/login'><span style={{color:"black"}}>Create your account!</span></Link>
				</button>
			)
		} else {
			return (
				<button
					id='submit'
					onClick={this.handleInvalid.bind(this)}>
					Confirm Info
				</button>
			)
		}
	}

	render() {
		const { email, name, password, passwordConfirm, zip } = this.state.form
		const { errors } = this.state

		console.log(this.state);

		return (
			<div className='form-container'>
				<h3>Create an account with IALA!</h3>
				<form>
					<div className='form-input'>
						<label id='email-input'>Email</label>
						<FormInput
							type="email"
							name='email'
							value={email}
							onChange={this.handleChange.bind(this)}
							errors={errors.email}
						/>
					</div>
						<div className='form-input'>
						<label id='name-input'>Name</label>
						<FormInput
							type="text"
							name='name'
							value={name}
							onChange={this.handleChange.bind(this)}
							errors={errors.name}
						/>
					</div>
					<div className='form-input'>
						<label id='password-input'>Password</label>
						<FormInput
							type="password"
							name='password'
							value={password}
							onChange={this.handleChange.bind(this)}
							errors={errors.password}
						/>
					</div>

					<div className='form-input'>
						<label id='passwordConfirm-input'>Confirm Password</label>
						<FormInput
							type="password"
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={this.handleChange.bind(this)}
							errors={errors.passwordConfirm}
						/>
					</div>

					<div className='form-input'>
						<label id='zip-input'>Zip</label>
						<FormInput
							type="text"
							name='zip'
							value={zip}
							onChange={this.handleChange.bind(this)}
							errors={errors.zip}
						/>
					</div>

					<div className= "button">
						{this.renderButton()}
					</div>
				</form>
			</div>
		)
	}
}


export default SignUp;
