import React, { Component } from 'react';

class TaskInput extends Component {
	constructor(props) {
	super(props);

	this.state = {
		form: {
			todoListId: 1,
			categoryId: 0,
			task: '',
			priority: 'low',
			desc: '',
			isComplete: false,
			dateStart: '',
			dateDone : ''
		}
	}

}


   handleInputChange(e) {
     const target = e.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value
     })
   }

   handleSubmit(e) {
    e.preventDefault();
    this.props.onAddTask(this.state);
    this.setState({
      todoListId: 1,
			categoryId: 0,
      task: '',
			priority: 'low',
      desc: '',
      isComplete: false,
      dateStart: '',
      dateDone: ''
    });
  }

  render() {
    return (
          <div className="todo-input-form">
            <form onSubmit={this.handleSubmit}>
						<h4>Add a New Task</h4><br/>

              <div className="form-group">
                <input  name="task"
                        type="text"
                        className="form-control"
                        id="inputTask"
                        value={this.state.task}
                        onChange={this.handleInputChange}
                        aria-describedby="Task"
                        placeholder="Task Title"></input>
              </div>


              <div className="form-group">
                <label htmlFor="inputPriority" className="control-label text-muted"><small>Priority</small></label>
                <select   name="priority"
                          type="text"
                          className="form-control"
                          id="inputPriority"
                          value={this.state.priority}
                          onChange={this.handleInputChange}
                          aria-describedby="Priority">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select><br/>
              </div>


              <div className="form-group">
                <label htmlFor="inputDesc" className="control-label text-muted"><small>Description</small></label>
                <textarea   name="desc"
                            type="text"
                            className="form-control"
                            id="inputDesc"
                            value={this.state.desc}
                            onChange={this.handleInputChange}
                            aria-describedby="Description"></textarea>
              </div>

	            <div className="form-group">
	              <button type="submit" className="btn btn-primary">Add To List</button>
	            </div>
        		</form>
      		</div>
    )
  }
}

export default TaskInput;
