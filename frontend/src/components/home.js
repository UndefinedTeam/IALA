import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
// import VendorSearch from './VendorSearch.js';

class Home extends Component {

	render (){
		return (
			<div className="home-container">
				<Jumbotron>
					<h1>Welcome to IALA!</h1>
						<p>
							It&rsquo;s A List App! Take your organization skills to a new level with all your lists and tasks in one place.
						</p>
							<ul className="home-list">
								<li>View all of your lists</li>
								<li>Search for Vendors</li>
								<li>Complete Tasks</li>
							</ul>
						<div className="button">
							<Button className="jumbo-button" href="/register">Start Here</Button>
						</div>
				</Jumbotron>

			</div>
		)
	}
}

export default Home;
