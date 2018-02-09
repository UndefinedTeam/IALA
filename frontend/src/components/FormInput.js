import React, { Component } from 'react';

class FormInput extends Component {
	constructor(props){
		super(props)

		const { type, name } = this.props

		this.state = {
			hasBeenTouched: false,
			type: type || 'text' || 'password',
			name: name
		}
	}

	onChange(e) {
		this.props.onChange(e)
		this.setState({
			hasBeenTouched: true
		})
	}

	render() {
		const { errors, name, value } = this.props
		const { hasBeenTouched, type } = this.state

		if (errors && hasBeenTouched){
			var passError = errors;
			var errorList = passError.map((el, index) => {
				return <li key={index}> {el} </li>
			})
		}

		return (
			<div className={`form-input ${errors && hasBeenTouched && 'has-error'}`}>
			 	<input
					type={type}
					name={name}
					value={value}
					onChange={this.onChange.bind(this)} />

				{errors && hasBeenTouched &&
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
