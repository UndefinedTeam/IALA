import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

	render (){
		return (
			<div className="home-container">
				<Jumbotron>
					<h1>It&rsquo;s A List App!</h1>
					<hr />
						<p>Use IALA to keep yourself orignized with lists to keep you on track with your tasks.</p>
								<ul className="home-list">
									<li>With IALA you can create multiple lists for any event or activity</li>
									<li>Add an unlimited amount of tasks to your lists</li>
									<li>Search for a businesses to help you complete your task and add them to your tasks</li>
									<li>Enjoy the sense of acomplishment when you check tasks as complete!</li>
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
