import React, { Component } from 'react';
import RegoInput from './SignUp-FormInput';

const { registration, errors } = this.state

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            registration: {
                email: "",
                name: "",
                password: "",
                zip: ""
            },
            errors: []
        }
    }

    getFields(){
        return registration
    }

    getErrors(){
        return errors
    }

    validateRego(){
        this.validatePresence('email')
        this.validatePresence('name')
        this.validatePresence('password')
        this.validatePresence('zip')

        this.validateEmail('email')
        this.validateName('name')
        this.validatePassword('password')
        this.validateZip('zip')

        this.setState({
            errors: errors
        })
    }

    // confirm that all fields are not blank
    validatePresence(fieldName){
        if(registration[fieldName] === ''){
            this.addError(fieldName, 'is Required')
        }
    }

    // confirm that the email is actually in the correct format
    validateEmail(fieldName){
        const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/

        if(!filter.test(registration[fieldName])){
            this.addError(fieldName, 'is not a valid email')
        }
    }

    validateName(fieldName){
        var number= /[0-7]/;
        // var special= ;
        // names cannot contain numbers or special characters
    }

    validatePassword(fieldName){
        var letter= /[a-zA-Z]/;
        var number= /[0-7]/;

        if(registration[fieldName].length < 6){
            this.addError(fieldName, 'needs a length of at least 6 characters')
        }else if(!registration[fieldName].match(letter)){
            this.addError(fieldName, 'password must contain letters')
        }else if(!registration[fieldName].match(number)){
            this.addError(fieldName, 'password must contain at least 1 number')
        }
    }

    validateZip(fieldName){
        
        this.addError(fieldName, 'Not a valid US zip code')
    }

    addError(fieldName, message){
        if (errors[fieldName]){
            errors[fieldName].push(message)
        }else{
            errors[fieldName] = [message]
        }
        return errors
    }

    handleChange(e){
        const rego = Object.assign({},this.state.registration)
        rego[e.target.name] = e.target.value
        this.setState({
            registration: rego
        })
    }

    handleSubmit(e){
        e.preventDefaut()
        console.log(this.state.registration);
    }

  render() {
    const { registration, errors } = this.state

    return (
        <div className='form-container'>
            <h3>Create an account with IALA!</h3>
                <form>
                    <div className='form-input'>
                        <input
                            type="text"
                            name='email'
                            value={registration.email}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter Email">
                        </input>
                    </div>
                    <div className='form-input'>
                        <input
                            type="text"
                            name='name'
                            value={registration.name}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter Name">
                        </input>
                    </div>
                    <div className='form-input'>
                        <input
                            type="text"
                            name='password'
                            value={registration.password}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Create Password">
                        </input>
                    </div>
                    <div className='form-input'>
                        <input
                            type="text"
                            name='zip'
                            value={registration.zip}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Enter Zip Code">
                        </input>
                    </div>
                    <div className= "button">
                        <input
                            type="button"
                            value='Submit'
                            onSubmit={this.handleSubmit.bind(this)}>
                        </input>
                    </div>
                </form>
        </div>
    )
  }
}

export default SignUp;
