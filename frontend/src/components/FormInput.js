import React, { Component } from 'react';

class FormInput extends Component {
	constructor(props){
		super(props)

		const { type, name } = this.props

		this.state = {
			hasBeenTouched: false,
			type: type || 'text',
			name: name
		}
	}

	render() {
		const { errors, name, value, onChange } = this.props
		const { hasBeenTouched, type } = this.state

		if (errors && this.state.hasBeenTouched){
			var passError = errors;
			var errorList = passError.map((el, index) => {
				return <li key={index}> {el} </li>
			})
		}

		return (
			<div className={`form-input ${errors && 'has-error'}`}>
			 	<input
					type={type}
					name={name}
					value={value}
					onChange={onChange} />

				{errors && this.state.hasBeenTouched &&
					<div className='help-block' id='help-block'>
						<ul>
							{errorList}
						</ul>
					</div>
				}
			</div>
		)
	}
}

export default FormInput;
