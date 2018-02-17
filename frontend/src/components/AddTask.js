import React, { Component } from 'react'
import FormInput from './FormInput'
import { createTask } from '../api/tasks'
import { validatePresence } from '../util/validations'

class AddTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				task: '',
				desc: '',
				type: '',
				isComplete: false,
				dateStart: '',
				dateDone : '',
				listId: '',
			},
			errors: {},
			newTaskSuccess: false,
		}
	}

	componentWillMount(){
		this.getCurrentDate()
		// this.getListId()
	}

	getCurrentDate(){
		var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.setState({
			dateStart: date
		})
	}

	getListId(){
        // gets the current list id for task and sets it in state
		// this.setState({
		// 	listId: id
		// })
	}

	validateForm(form) {
		let errors = {}

		// task name field
		errors = validatePresence(errors, form, 'task')

		// description field
		errors = validatePresence(errors, form, 'desc')

		//type field
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
  			 newTaskSuccess: false
  		 })
  	 } else {
  		 this.setState({
  			 form: form,
  			 errors: this.validateForm(form),
  		 })
  		 console.log("List is ready to be added!");
  	 }
   }

   handleSubmit(e) {
	const { form } = this.state
	let { listId } = this.props

	console.log("The thing I need", listId);
	e.preventDefault()

	if(Object.keys(this.state.errors).length > 0) {
		return this.state.errors
	} else {
		createTask(form, parseInt(listId))
		this.setState({
			newTaskSuccess: true
		})
	}
  }

	render() {
		const { task, desc, type, newTaskSuccess } = this.state.form
		const { errors } = this.state

		return (
			<div className='form-container'>
				<h3>Create a New List</h3>
					<form>
						<div className='form-input'>
						<label id='task-input'>Task</label>
							<FormInput
								type='text'
								name='task'
								value={task}
								onChange={this.handleChange.bind(this)}
								errors={errors.task}
							/>
						</div>
						<div className='form-input'>
						<label id='desc-input'>Description of task</label>
							<FormInput
								type='textarea'
								name='desc'
								value={desc}
								onChange={this.handleChange.bind(this)}
								errors={errors.desc}
							/>
						</div>
						<div className='form-input'>
						<label id='type-input'>Type</label>
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
									value='re-render task dashboard'
									onClick={this.handleSubmit.bind(this)}
								>
									Create Task
								</button>
							</div>
					</form>
			</div>
		)
	}
}

export default AddTask;
