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
				<section id="labels">
					<div className="feat-list">
						<h4>Featured List</h4>
					</div>
					<div className="feat-vendor">
						<h4>Featured Vendor</h4>
					</div>
				</section>
				<section id="features">
					<div className="feat-list">
						<img src={require("../images/coffee-cup-desk-pen.jpg")} alt="cofee-cup" />
					</div>
					<div className="feat-vendor">
						<img src={require("../images/calendar.jpeg")} alt="calendar"/>
					</div>
				</section>

			</div>
		)
	}
}

export default Home;
