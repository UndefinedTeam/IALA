import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


class Tasks extends Component {
        constructor(props){
        super(props)
        this.state = {
            user: [],
            tasks: []
        }
    }

    render(){

        return(
            <div>
            <h3> Hello</h3>
            <div className="userTasks-container">
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
                                    Tasks in ul
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
            </div>
            </div>
        )
    }
}


export default Tasks;