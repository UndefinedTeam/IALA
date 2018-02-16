import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

	render (){
		return (
			<div className="home-container">
				<Jumbotron>
					<h1>Welcome to IALA!</h1>
					<hr />
						<p>
							It&rsquo;s A List App! <br />
							Use IALA to stay orignized when creating todo lists. <br />
							With IALA you can create multiple todo lists, add unlimited amount of tasks within those todo lists <br />
							and search for any business you need to find, then add them to your todo list. <br />
							IALA is your one stop shop organizer.<br />
						</p>
							<Button className="jumbo-button" href="/register">Start Here</Button>
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
