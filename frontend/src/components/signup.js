import React, { Component } from 'react';
import RegoInput from './SignUp-FormInput';



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
            return this.state.registration
        }

        getErrors(){
            return this.state.errors
        }

        validateRego(){
            this.setState({
                errors: []
            })

            this.validatePresence('email')
            this.validatePresence('name')
            this.validatePresence('password')
            this.validatePresence('zip')
            this.validateEmail('email')
            this.validateName('name')
            this.validatePassword('password')
            this.validateZip('zip')
        }

        // confirm that all fields are not blank
        validatePresence(errors, fieldName) {
            console.log(fieldName);
            console.log(this.state);
            if(this.state.registration[fieldName] === ''){
                this.addError(fieldName, 'This field is required')
            }
        }

        // confirm that the email is actually in the correct format
        validateEmail(fieldName){
            const filter = /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/

            if(!filter.test(this.state.registration[fieldName])){
                this.addError(fieldName, 'Not a valid email')
            }
        }

        validateName(fieldName){
            var letter= /[a-zA-Z]/;

            if(!this.state.registration[fieldName].match(letter)){
                this.addError(fieldName, 'Name can only contain letters')
            }
        }

        validatePassword(fieldName){
            var letter= /[a-zA-Z]/;
            var number= /[0-7]/;

            if(this.state.registration[fieldName].length < 6) {
                this.addError(fieldName, 'Password must have at least 6 characters')
            } else if(!this.state.registration[fieldName].match(letter)) {
                this.addError(fieldName, 'Password must contain letters')
            } else if(!this.state.registration[fieldName].match(number)) {
                this.addError(fieldName, 'Password must contain at least 1 number')
            }
        }

        validateZip(fieldName){
            var validZip = /^\d{5}$/;
            if(!this.state.registration[fieldName].match(validZip)){
                this.addError(fieldName, 'Not a valid US zip code')
            }
        }

        errorsFor(attribute){
          var errorString = ""

          if(this.props.errors){
            const errors = this.props.errors.filter(error => error.param === attribute )
            if(errors){
              errorString = errors.map(error => error.msg ).join(", ")
            }
          }
          return errorString === "" ? null : errorString
        }

        addError(fieldName, message){
            const errors = this.state.errors

            if(errors[fieldName]) {
                errors[fieldName].push(message)
            } else {
                errors[fieldName] = [message]
            }

            this.setState({
                errors: errors
            })
        }

        handleChange(e) {
            const form = this.state.registration

            form[e.target.name] = e.target.value

            let errors = []

            errors = validateForm(form)

            this.setState({
                registration: form,
                errors: errors
            })
        }

        // on every click check the form fields
        // if there are any errors
        // send the error messages as strings into an array
        //fields cannot be empty
        //email must be a valid email
        //name must be letters
        //password must have 6 characters, 1 number and 1 letter
        //zip must contain 5 digits and be a valid US zip

        handleSubmit(e) {
            console.log(e);

            e.preventDefault()

            // this.getFields();
            //
            // console.log(this.state.registration);
            //
            // this.validateRego();

            // now you just need to check errors

            if(this.state.errors.length > 0) {

            }

            this.setState({
                errors: this.getErrors()
            })
        }


      render() {
        return (
            <div className='form-container'>
                <h3>Create an account with IALA!</h3>
                    <form>
                        <div className='form-input'>
                        <label id='email-input'>Email</label>
                            <RegoInput
                                type="text"
                                name='email'
                                value={this.state.registration.email}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Email"
                                errors={this.state.errors.email}
                            />
                        </div>
                        <div className='form-input'>
                        <label id='name-input'>Name</label>
                            <RegoInput
                                type="text"
                                name='name'
                                value={this.state.registration.name}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Name"
                                errors={this.state.errors.name}
                            />
                        </div>
                        <div className='form-input'>
                        <label id='password-input'>Password</label>
                            <RegoInput
                                type="text"
                                name='password'
                                value={this.state.registration.password}
                                onChange={this.handleChange.bind(this)}
                                errors={this.state.errors.password}
                            />
                        </div>

                        <div className='form-input'>
                            <label id='zip-input'>Zip</label>
                            <RegoInput
                                type="text"
                                name='zip'
                                value={this.state.registration.zip}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Enter Zip Code"
                                errors={this.state.errors.zip}
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

function validateForm(form) {
    let errors = {}

    // email
    errors = validatePresence(errors, form, 'email')
    errors = validateLength(errors, form, 'email', 5, 64)

    // name
    errors = validatePresence(errors, form, 'name')

    // password
    errors = validatePresence(errors, form, 'password')

    return errors
}

function validatePresence(errors, form, field) {
    if(form[field].trim() !== "") {
        return errors
    }

    return addError(errors, field, `${field} can't be empty`)
}

function validateLength(errors, form, field, min, max) {
    if(form[field].trim().length < min) {
        errors = addError(errors, field, `${field} must be at least ${min} long.`)
    }

    if(form[field].trim().length > max) {
        errors = addError(errors, field, `${field} can't be more than ${max} long.`)
    }

    return errors
}

function addError(errors, field, error) {
    if(errors[field]) {
        errors[field].push(error)
    } else {
        errors[field] = [error]
    }

    return errors
}
