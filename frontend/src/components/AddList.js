import React, { Component } from 'react'
import FormInput from './FormInput'
import { createList } from '../util/ApiCalls'
import { validatePresence } from '../util/validations'

// form below adds a new list then redirects to tasksDash for user to add tasks to the list.

class AddList extends Component {
    constructor(props){
        super(props)

        this.state = {
            form: {
                title: "",
                type: "",
                // userId: this.props.user.id,
            },
            errors: {},
            newListSuccess: false,
        }
    }

    validateForm(form) {
		let errors = {}

        // Title field
        errors = validatePresence(errors, form, 'title')

        // Type field
        errors = validatePresence(errors, form, 'type')

		return errors
	}

	handleChange(e) {
        const { form } = this.state

		form[e.target.name] = e.target.value
		if(Object.keys(this.validateForm(form).length > 0)) {
			this.setState({
				form: form,
				errors: this.validateForm(form),
				newListSuccess: false
			})
		} else {
			this.setState({
				form: form,
				errors: this.validateForm(form),
				newListSuccess: true
			})
		}
	}

	handleSubmit(e) {
        const { form } = this.state
		//console.log(e);
		e.preventDefault()

		if(Object.keys(this.state.errors).length > 0) {
			console.log("nein");
			return this.state.errors
		} else {
			createList(form)
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
                        <form action='/tasks-dash'>
                            <div className= "button">
                                <button
                                    type='submit'
                                    value='go to task dashboard'
                                    onChange={this.handleSubmit.bind(this)}
                                >
                                    Create List
                                </button>
                            </div>
                        </form>
                    </form>
            </div>
        )
    }
}

export default AddList
