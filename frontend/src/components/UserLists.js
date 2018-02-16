import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { fetchUser, fetchUserLists, fetchListTasks } from '../util/ApiCalls'
import AddList from './AddList';


class UserLists extends Component {
    constructor(props){
        super(props)

        this.state = {
            lists: {},
            tasks: {}
        }
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

    getTasks(listId){
        fetchListTasks(listId)
        .then((tasks) => {
            this.setState({
                tasks: tasks.tasks,
            })
        })
        .catch(e => {console.log(e) })
    }


	render() {
		let { user } = this.props
        let { lists, tasks } = this.state

        return(
            <div className="userList-container">
                <div>
                    <h2> {user.name} &rsquo;s Lists</h2>

                    <Panel bsStyle="success" id="collapsible-panel">
                        <Panel.Heading >
                            <Panel.Title toggle componentClass="h3">
                                <h3>{lists.title}</h3>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                {Object.keys(tasks).map((task, index) => {
                                    return(
                                        <ul key={index} >
                                            <li>{tasks.name}</li>
                                        </ul>
                                    )
                                })}
                                <form action='/tasks-dash'>
                                    <div className="button">
                                        <button
                                            type="submit"
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
                    <AddList />
                </div>
            </div>
        )
    }
}

export default UserLists;
