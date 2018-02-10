import React, { Component } from 'react';
import FormInput from './FormInput';
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

            message: "initial",

            errors: {}
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
        e.preventDefault()

        let { message, form } = this.state

        let errors = this.validateForm(form)

        if(Object.keys(errors).length > 0) {
            message = "You need to fix the errors below before submitting"
        } else {
            console.log(form)
            message = ""
        }

        this.setState({
            message: message,
            errors: errors
        })
    }


    render() {
        const { email, name, password, passwordConfirm, zip } = this.state.form
        const { errors, message } = this.state

        return (
            <div className='form-container'>
                <h3>Create an account with IALA!</h3>
                <h4>{message}</h4>
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
                                onClick={this.handleSubmit.bind(this)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
            </div>
        )
    }
}


export default SignUp;
