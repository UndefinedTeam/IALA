import React, { Component } from 'react'
import FormInput from './FormInput'
import { Link } from 'react-router-dom'
import { createList } from '../api/lists'
import { validatePresence } from '../util/validations'

// form below adds a new list then redirects to tasksDash for user to add tasks to the list.

class AddList extends Component {
    constructor(props){
        super(props)

        this.state = {
            form: {
                title: "",
                type: "",
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
			})
			console.log("List is ready to be added!");
		}
	}

// New list is created
// TODO: page needs to re-render once the newListSuccess = true ** Not currently doing this **

	handleSubmit(e) {
		const { form } = this.state
		let { userId } = this.props

		console.log("The thing I need", userId);
		e.preventDefault()

		if(Object.keys(this.state.errors).length > 0) {
			return this.state.errors
		} else {

			createList(form, parseInt(userId))
			this.setState({
				newListSuccess: true
			})
		}
	}


    render(){
        const { title, type, newListSuccess} = this.state.form
        const { errors } = this.state
		let message

		if (!newListSuccess){
			return message = "Could not add your List"
		} else {
			return message = "Success! Your list has been created"
			this.render()
		}

        return(
            <div className='form-container'>
                <h3>Create a New List</h3>
					<p>{message}</p>
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
                            <div className= "button">
                                <button
                                    type='submit'
                                    value='go to task dashboard'
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Create List
                                </button>
                            </div>
                    </form>
            </div>
        )
    }
}

export default AddList
