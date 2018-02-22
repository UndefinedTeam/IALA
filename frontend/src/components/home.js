import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {

	render (){
		return (
			<div className="home-container">
				<Jumbotron>
					<h1>It&rsquo;s A List App!</h1>
					<hr />
						<p>Use IALA to keep yourself organized with lists to keep you on track with your tasks both large and small.</p>
								<ul className="home-list">
									<li>With IALA you can create lists for any event or activity</li>
									<li>Add an unlimited amount of tasks to your lists</li>
									<li>Search for businesses to help you complete your tasks and add them to your lists</li>
									<li>Enjoy the sense of accomplishment when you check tasks as complete!</li>
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
