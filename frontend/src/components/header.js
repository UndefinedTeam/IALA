import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
	logInOrOut(){
		let token = localStorage.getItem('authToken')
		const login = <NavItem href='/login'>Log In</NavItem>
		const logout = <NavItem onClick={this.logOut.bind(this)}href='/'>Log Out</NavItem>

		if(token !== "logout") {
			return logout
		}

		return login
	}

	logOut(e){
		if(e) {
			localStorage.setItem("authToken", "logout")
		}
	}

	render() {
		return(
			<div>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">IALA</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem  href='/register'>
								Register
							</NavItem>
							{this.logInOrOut()}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default Header;
