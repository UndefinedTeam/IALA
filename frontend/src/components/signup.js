import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props){
        super(props)

        this.state = {
            registration: {
                email: "",
                name: "",
                password: "",
                zip: ""
            }
        }
    }

    handleChange(e){
        this.setState({
            email: e.target.name,
            name: e.target.name,
            password: e.target.password,
            zip: e.target.zip
        })
    }

  render() {
    return (
        <div className='form-container'>
            <h3>Create an account with IALA!</h3>
                <form>
                    <div className='form-input'>
                        <input type="text" name='email' placeholder="Enter Email"></input>
                    </div>
                    <div className='form-input'>
                        <input type="text" name='name' placeholder="Enter Name"></input>
                    </div>
                    <div className='form-input'>
                        <input type="text" name='password' placeholder="Create Password"></input>
                    </div>
                    <div className='form-input'>
                        <input type="text" name='zip' placeholder="Enter Zip Code"></input>
                    </div>
                    <div className= "button">
                        <input type="button" value='Submit'></input>
                    </div>
                </form>
        </div>
    )
  }
}

export default SignUp;
