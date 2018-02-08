import React, { Component } from 'react';
import FormInput from './FormInput';
import { validatePresence, validateLength, validateEmail, validatePassword, validateNumeric, addError } from '../util/validations'


class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                email: "",
                name: "",
                password: "",
                zip: ""
            },

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

        // Zip
        errors = validatePresence(errors, form, 'zip')
        errors = validateNumeric(errors, form, 'zip')
        errors = validateLength(errors, form, 'zip', 5, 5)

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
        console.log(e);

        e.preventDefault()

        // now you just need to check errors

        if(this.state.errors.length > 0) {
            // this is a failing case!!!

            return
        }

        console.log("this means we can submit the form! :)");
    }


    render() {
        const { email, name, password, zip } = this.state.form
        const { errors } = this.state

        return (
            <div className='form-container'>
                <h3>Create an account with IALA!</h3>
                    <form>
                        <div className='form-input'>
                        <label id='email-input'>Email</label>
                            <FormInput
                                type="text"
                                name='email'
                                value={email}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Email"
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
                                placeholder="Enter Name"
                                errors={errors.name}
                            />
                        </div>
                        <div className='form-input'>
                        <label id='password-input'>Password</label>
                            <FormInput
                                type="text"
                                name='password'
                                value={password}
                                onChange={this.handleChange.bind(this)}
                                errors={errors.password}
                            />
                        </div>

                        <div className='form-input'>
                            <label id='zip-input'>Zip</label>
                            <FormInput
                                type="text"
                                name='zip'
                                value={zip}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Zip Code"
                                errors={errors.zip}
                            />
                        </div>

                        <div className= "button">
                            <button onClick={this.handleSubmit.bind(this)}>
                                Submit
                            </button>
                        </div>
                    </form>
            </div>
        )
    }
}


export default SignUp;
