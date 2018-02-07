import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

	render (){
		return (
			<div className="home-container">
				<Jumbotron>
					<h1>Welcome to IALA!</h1>
						<p>
							It&rsquo;s A List App! Take your organization to a new level with all your lists and tasks in one place.
						</p>
						<p>
							<Button className="jumbo-button">Start Here</Button>
						</p>
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
						<img src={require("../images/coffee-cup-desk-pen.jpg")} />
					</div>
					<div className="feat-vendor">
						<img src={require("../images/calendar.jpeg")} />
					</div>
				</section>
			</div>
		)
	}
}

export default Home;
