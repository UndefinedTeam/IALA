import React, { Component } from 'react';

class RegoInput extends Component {
	constructor(props){
		super(props)
		this.state = {
			type: this.props.type || 'text',
			name: this.props.name
		}
	}

	render(){

		if (this.props.errors){
			var passError = this.props.errors;
			var errorList = passError.map((el, index) => {
				return <li key={index}> {el} </li>
			})
		}

		return (
			<div className={`form-input ${this.props.errors && 'has-error'}`}>
			 	<input
					type={this.state.type}
					name={this.props.name}
					value={this.props.value}
					onChange={this.props.onChange}>
				</input>

				{this.props.errors &&
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

export default RegoInput;
