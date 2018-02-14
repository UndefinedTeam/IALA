import React, { Component } from 'react';
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

            errors: {},
            newUserSuccess: null,
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

        this.setState({
            form: form,
            errors: this.validateForm(form)
        })
    }

    handleSubmit(e) {
        const { form } = this.state
        console.log(e);
        let status
        e.preventDefault()

        if(this.state.errors.length > 0) {
            // this is a failing case!!!
            return this.state.errors
        } else {
             status = addNewUser(form)
        }
        return status
    }

    handleNewUser(status){
        let message
        if (status == true){
            this.setState({newUserSuccess: status})
            return message = <h3>Success! your account has been created</h3>
        } else {
            return message = <h3>Error unable to create an account</h3>
        }
    }

    render() {
        const { email, name, password, passwordConfirm, zip } = this.state.form
        const { errors } = this.state
        let message
        
        return (
            <div className='form-container'>
                <h3>Create an account with IALA!</h3>
                     {message}
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
                            <button
                                id='submit'
                                onClick={this.handleSubmit.bind(this)}>
                                Submit
                            </button>
                        </div>
                    </form>
            </div>
        )
    }
}


export default SignUp;
