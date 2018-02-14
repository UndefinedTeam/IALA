import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UserLists extends Component {

    render() {
        // const { user, lists, tasks } = this.props
        console.log(this.props)

        return(
            <div className="userList-container">
                <h2>user name List&#39;s</h2>
                    <div>
                        <Panel bsStyle="success" id="collapsible-panel">
                            <Panel.Heading>
                                <Panel.Title toggle componentClass="h3">
                                    My ToDo Lists 
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    list description & tasks
                                    <div><button href="/dashboard/list/:id/tasks">View List</button></div>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
            </div>
        )
    }
}

export default UserLists;
