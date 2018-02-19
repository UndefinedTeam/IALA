import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { fetchUserLists } from '../api/lists'
import AddList from './AddList';



class UserLists extends Component {
	constructor(props){
		super(props)

		this.state = {
			listId: ""
		}
	}


	handleClick(lists, e){
		console.log("Which List?", lists)
		console.log("onclick Value", e.value)

	}


	render() {
		let { user, lists } = this.props

		console.log("in Userdash", lists)

		if(!user) {
			return (
				<h1>Loading...</h1>
			)
		}
        // User lists show up! YAY!
        // TODO: when a user clicks on the view list button the task dash needs to only display tasks from that specific list ** by List id **

		return(
			<div className="userList-container">
				<div>
					<h2> {user.name} &rsquo;s Lists</h2>
					{Object.keys(lists).map((lists, index) => {
						return (
							<Panel bsStyle="success" id="collapsible-panel">
								<Panel.Heading key={index}>
									<Panel.Title toggle componentClass="h3">
										<h3>{lists[index].title}</h3>
									</Panel.Title>
								</Panel.Heading>
								<Panel.Collapse>
									<Panel.Body>
										{lists[index].type}
										<div className="button">
											<Link to='/dashboard/tasks'>
												<button
													type="get"
													value={lists[index].id}
													onclick={this.handleClick.bind(this, lists)} >
														View List
												</button>
											</Link>
										</div>
									</Panel.Body>
								</Panel.Collapse>
							</Panel>
						)
					})}
				</div>
				<div>
					<AddList userId={user.id}/>
				</div>
			</div>
		)
	}
}

export default UserLists;
