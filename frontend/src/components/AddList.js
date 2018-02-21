import React, { Component } from 'react'
import FormInput from './FormInput'
import { validatePresence } from '../util/validations'
import { Lists } from '../api'

// form below adds a new list then redirects to tasksDash for user to add tasks to the list.

class AddList extends Component {
    constructor(props){
        super(props)

        this.state = {
            form: {
                title: "",
                type: "",
            },
            errors: "Empty Form"
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
		e.preventDefault()

		if(Object.keys(this.state.errors).length > 0) {
			this.setState({
				errors: this.state.errors
			})
		} else {
			Lists.create(form, parseInt(userId, 10))
			
			this.refreshLists()
		}
	}

	refreshLists(){
		this.props.refreshLists()
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
