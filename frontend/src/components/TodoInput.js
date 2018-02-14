import React, { Component } from 'react';

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      todoDescription: '',
      todoPriority: 'lowest'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInputChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value
     })
   }

   handleSubmit(event) {
    event.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      todoTitle: '',
      todoDescription: '',
      todoPriority: 'lowest'
    });
  }

  render() {
    return (
      <div className="todo">
        <h4>Add a New Todo Item</h4><br/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input  name="todoTitle"
                    type="text"
                    className="form-control"
                    id="inputTodoTitle"
                    value={this.state.todoTitle}
                    onChange={this.handleInputChange}
                    aria-describedby="Todo Title"
                    placeholder="Task Title"></input>
            </div>


            <div className="form-group">
              <label htmlFor="inputTodoPriority" className="control-label text-muted"><small>Priority</small></label>
              <select   name="todoPriority"
                        type="text"
                        className="form-control"
                        id="inputTodoPriority"
                        value={this.state.todoPriority}
                        onChange={this.handleInputChange}
                        aria-describedby="Todo Priority">
                
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select><br/>
            </div>


            <div className="form-group">
              <label htmlFor="inputTodoDescription" className="control-label text-muted"><small>Description</small></label>
              <textarea   name="todoDescription"
                          type="text"
                          className="form-control"
                          id="inputTodoDescription"
                          value={this.state.todoDescription}
                          onChange={this.handleInputChange}
                          aria-describedby="Todo Description"></textarea>
            </div>
           
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Add To List</button>
            </div>
        </form>
      </div>
    )
  }
}

export default TodoInput;