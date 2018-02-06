import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

	render() {
		return(
			<div className="header-container">
				<div>
					<h1>IALA</h1>
				</div>
				<div className="nav-right">
					<li><Link to='/login'>Login<Link></li>|
					<li><Link to='/register'>Register</Link></li>
				</div>
			</div>
		)
	}
}

export default Header;
