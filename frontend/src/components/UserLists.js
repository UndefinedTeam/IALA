import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UserLists extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: [],
            lists: []
        }
    }

    render() {
        const { user, lists, tasks } = this.props
        // console.log( "User:", user)
        // console.log("Lists:", lists)
        // console.log("Tasks:",tasks)

        return(
            <div className="userList-container">
                        <div>
                            <h2>{user.name} List&#39;s</h2>
                        </div>
                <div>
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
                                <button
                                    href={`/dashboard/list/${tasks.id}/tasks`}>
                                        View List
                                </button>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default UserLists;
