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










import React, { Component } from 'react';
import Tasks from './tasks'; 

var todos = [
  {
    todoTitle: 'Do some coding',
    todoResponsible: 'Mike Polinowski',
    todoDescription: 'His values - and his record - affirm what is best in us. And it`s a lesson we need to remember today - as members of another Joshua generation.',
    todoPriority: 'medium'
  },
  {
    todoTitle: 'Drink Coffee',
    todoResponsible: 'Mike Polinowski',
    todoDescription: 'And when these battles were overtaken by others and when the wars they opposed were waged and won, these faithful foot soldiers for justice kept marching. Like other black churches, Trinity`s services are full of raucous laughter and sometimes bawdy humor.',
    todoPriority: 'high'
  }
]

class TasksDash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleRemoveTodo(index) {
    this.setState({
      todos: this.state.todos.filter(function(e, i) {
        return i !== index;
      })
    })
  }

  handleAddTodo(todo) {
  this.setState({todos: [...this.state.todos, todo]});
}

  render() {
    return (
      <div className="container">

        <nav className="navbar fixed-top navbar-dark bg-dark">
          <div className="task-list">
            <img src={require("../images/list-icon.png")} alt="list-icon" />
          </div>
          <h1 className="navbar-brand">
            Todo Count: <span className="badge badge-pill badge-primary">{this.state.todos.length}</span>
          </h1>
        </nav>

          <div className="row mt-5">
            <br/>
            <TodoInput onAddTodo={this.handleAddTodo}/>
            <hr/>
          </div>

          <div className="row mt-5">
            <div className="col">
              <ul className="list-group">
                { this.state.todos.map((todo, index) =>
                    <li className="list-group-item" key={index}>
                      <h4 className="list-group-item-heading">{todo.todoTitle} <small><span className="badge badge-secondary">{todo.todoPriority}</span></small></h4>
                      <p><i className="fa fa-user-circle-o" aria-hidden="true"></i> {todo.todoResponsible}</p>
                      <p className="text-justify">{todo.todoDescription}</p>
                      <button className="btn btn-danger btn-sm float-right" onClick={this.handleRemoveTodo.bind(this, index)}><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp; Delete</button>
                    </li>
                )}
              </ul>
            </div>
            {/* col */}
        </div>
        {/* row */}
      </div>
    );
  }

 }

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: '',
      todoResponsible: '',
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
      todoResponsible: '',
      todoDescription: '',
      todoPriority: 'lowest'
    });
  }

  render() {
    return (
      <div className="col">
        <br/><br/><br/>
        <h4>Add New Todo</h4><br/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input  name="todoTitle"
                    type="text"
                    className="form-control"
                    id="inputTodoTitle"
                    value={this.state.todoTitle}
                    onChange={this.handleInputChange}
                    aria-describedby="Todo Title"
                    placeholder="Enter Title"></input>
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
                <option>lowest</option>
                <option>low</option>
                <option>medium</option>
                <option>high</option>
                <option>emergency</option>
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
              <label htmlFor="inputTodoResponsible" className="control-label text-muted"><small>Responsible</small></label>
              <select   name="todoResponsible"
                        type="text"
                        className="form-control"
                        id="inputTodoResponsible"
                        value={this.state.todoResponsible}
                        onChange={this.handleInputChange}
                        aria-describedby="Todo Responsible">
                <option>someone else</option>
                <option>Mike Polinowski</option>
                <option>Micro Aggressions</option>
                <option>Vladimir Putin</option>
                <option>Climate Change</option>
              </select><br/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary float-right">Add Todo</button>
            </div>
        </form>
      </div>
    )
  }
}

export default TasksDash;

