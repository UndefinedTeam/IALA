import React, { Component } from 'react'
import FormInput from './FormInput'
import { validatePresence, validateEmail, validatePassword, confirmPassword, validateZip } from '../util/validations'

// form below adds a new list then redirects to tasksDash for user to add tasks to the list.

class AddList extends Component {
    constructor(props){
        super(props)

        this.state = {
            form: {
                title: "",
                type: "",
            },
            errors: {}
        }
    }

    render(){
        const { title, type } = this.state.form
        const { errors } = this.state

        return(
            <div className='form-container'>
                <h3>Create a New List</h3>
                    <form>
                        <div className='form-input'>
                        <label id='title-input'>Title</label>
                            <FormInput
                                type='text'
                                name='title'
                                value={title}
                                onChange={this.handleChange.bind(this)}
                                errors={errors.title}
                            />
                        </div>
                        <div className='form-input'>
                        <label id='type-input'>List type</label>
                            <FormInput
                                type='text'
                                name='type'
                                value={type}
                                onChange={this.handleChange.bind(this)}
                                errors={errors.type}
                            />
                        </div>
                        <form action="/tasks-dash">
                            <div className= "button">
                                <button type="submit" value="go to task dashboard">Create List</button>
                            </div>
                        </form>
                    </form>
            </div>
        )
    }
}

export default AddList
