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
							<ul className="home-list">
								<li>View all of your lists</li>
								<li>Search for Vendors</li>
								<li>Complete Tasks</li>
							</ul>
						<div className="button-front">
							<Button className="jumbo-button" href="/register">Start Here</Button>
						</div>
				</Jumbotron>

			</div>
		)
	}
}

export default Home;
