import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UserLists extends Component {
    render() {
        const { user } = this.props
        
        return(
            <div className="userList-container">
                <h2>UserName List&#39;s</h2>
                    <div>
                        <Panel bsStyle="success" id="collapsible-panel">
                            <Panel.Heading>
                                <Panel.Title toggle componentClass="h3">
                                    List title
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    List description or list of tasks in ul
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
            </div>
        )
    }
}

export default UserLists;
