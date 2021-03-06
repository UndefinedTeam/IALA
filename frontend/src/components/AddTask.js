import React, { Component } from 'react'
import FormInput from './FormInput'
import api from '../api'
import { validatePresence } from '../util/validations'

const { Tasks } = api()

class AddTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				task: '',
				desc: '',
				isComplete: false,
				dateStart: '',
				dateDone : '',
				listId: this.props.listId,
			},
			errors: {},
			newTaskSuccess: false,
		}
	}

	validateForm(form) {
		let errors = {}

		// task name field
		errors = validatePresence(errors, form, 'task')

		// description field
		errors = validatePresence(errors, form, 'desc')

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
  		 console.log("Task is ready to be added!");
  	 }
   }

	handleSubmit(e) {
		let { listId } = this.props
		const { form } = this.state

		// console.log("The thing I need", listId);
		e.preventDefault()

		if(Object.keys(this.state.errors).length > 0) {
			return this.state.errors
		} else {
			Tasks.create(parseInt(listId, 10), form)
			this.setState({
				newTaskSuccess: true,
			})
			this.refreshTasks()
		}
	}

	refreshTasks(){
		this.props.refreshTasks()
	}

	render() {
		const { task, desc } = this.state.form
		const { errors } = this.state

		return (
			<div className='form-container'>
					<form>
					<h3>Create a New Task</h3>
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
								type='text'
								name='desc'
								value={desc}
								onChange={this.handleChange.bind(this)}
								errors={errors.desc}
							/>
						</div>
							<div className= "button">
								<button
									className="button-submit"
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
