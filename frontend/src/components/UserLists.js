import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchUserLists } from '../api/lists'
import { fetchTasks } from '../api/tasks'
import AddList from './AddList';


class UserLists extends Component {
    constructor(props){
        super(props)

        this.state = {
            lists: {},
        }
    }

    componentDidMount(){
        let { user } = this.props
        this.getLists(user.id)
    }

    getLists(id){
        fetchUserLists(id)
        .then((res) => {
            console.log("fetch", res.lists)
            this.setState({
                lists: res.lists,
            })
        })
        .catch(e => {console.log(e) })
    }

	render() {
		let { user } = this.props
		let { lists, tasks } = this.state
		console.log("hi", user);

		if(!user) {
			return (
				<h1>Loading...</h1>
			)
		}

		return(
			<div className="userList-container">
				<div>
					<h2> {user.name} &rsquo;s Lists</h2>
					<Panel bsStyle="success" id="collapsible-panel">
						<Panel.Heading>
							<Panel.Title toggle componentClass="h3"><h3>{lists.title}</h3></Panel.Title>
						</Panel.Heading>
						<Panel.Collapse>
							<Panel.Body>
								<form action='/dashboard/tasks'>
									<div className="button">
										<button
											type="get"
											value="view list">
											View List
										</button>
									</div>
								</form>
							</Panel.Body>
						</Panel.Collapse>
					</Panel>
				</div>
				<div>
					<AddList user={user.id}/>
				</div>
			</div>
		)
	}
}

export default UserLists;
