import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
	logInOrOut(){
		let token = localStorage.getItem('authToken')
		const login =
			<Nav pullRight className="headerlink">
				<Link to='/register'>Register</Link>
				<Link to='/login'>Log In</Link>
			</Nav>
		const logout =
			<Nav pullRight className="headerlink">
				<Link to='/dashboard'>Dashboard</Link>
				<Link to='/' onClick={this.logOut.bind(this)}>Log Out</Link>
			</Nav>

		if(token !== 'logout' || !token ) {
			return logout
		}
		return login
	}

	logOut(e){
		if(e) {
			localStorage.setItem('authToken', 'logout')
		}
	}

	render() {
		return(
			<div>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/"><img src={require("../images/logo.png")} alt="IALA logo" className="logo" /></Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						{this.logInOrOut()}
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default Header;
