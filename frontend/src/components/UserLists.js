import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UserLists extends Component {

    render() {
        const { user, lists, tasks } = this.props
        console.log(this.props)

        return (
            <h1>Ignoring for Now</h1>
        )

        // return(
        //     <div className="userList-container">
        //         <h2>user name List&#39;s</h2>
        //             <div>
        //                         <Panel bsStyle="success" id="collapsible-panel">
        //                             <Panel.Heading>
        //                                 <Panel.Title toggle componentClass="h3">
        //                                     {lists.title}
        //                                 </Panel.Title>
        //                             </Panel.Heading>
        //                             <Panel.Collapse>
        //                                 {tasks.map((task, index) => {
        //                                     return(
        //                                         <Panel.Body key={index}>
        //                                             <div>{tasks.task}</div>
        //                                             <div>{tasks.desc}</div>
        //                                             <div>{tasks.isComplete}</div>
        //                                             <div><button href=`/dashboard/list/${id}/tasks`>View List</button></div>
        //                                         </Panel.Body>
        //                                 )
        //                             })
        //                         }
        //                             </Panel.Collapse>
        //                         </Panel>
        //
        //             </div>
        //     </div>
        // )
    }
}

export default UserLists;
