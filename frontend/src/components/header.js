import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Header extends Component {

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
							<NavItem href='/login'>
								Login
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		)
	}
}

export default Header;



//   <Navbar.Text>
// 	Hello: <Navbar.Link href="#">Link client name here</Navbar.Link>
//   </Navbar.Text>
//   <Nav pullRight>
// 	<NavItem eventKey={2} href="#">
// 	  Sign Out
// 	</NavItem>
//   </Nav>
