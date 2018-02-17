import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
	logInOrOut(){
		let token = localStorage.getItem('authToken')
		const login = 	<Nav pullRight><NavItem  href='/register'>Register</NavItem><NavItem href='/login'>Log In</NavItem></Nav>
		const logout = <Nav pullRight><NavItem  href='/dashboard'>Dashboard</NavItem><NavItem onClick={this.logOut.bind(this)}href='/'>Log Out</NavItem></Nav>

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
							<Link to="/"><img src={require("../images/logo.png")} alt="cofee-cup" className="logo" /></Link>
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
