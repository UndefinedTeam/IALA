import React, { Component } from 'react';

class UserLists extends Component {

    render(){
        console.log(this.props.user);
       //  if(this.props.lists.length > 0) {
       //     let lists;
       //     let listId = this.props.id;
       //
       //     for (let i = 0; i < this.props.lists.length; i++){
       //         if (listId === this.props.lists[i].id) {
       //             lists = this.props.lists[i]
       //         }
       //     }
       // }

        return(
            <div>
                <h2>{this.props.user} List&#39;s</h2>
                    <div>

                    </div>
            </div>
        )
    }
}

export default UserLists;
