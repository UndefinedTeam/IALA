import React, { Component } from 'react';
import Tasks from './tasks'; 
import Progress from './Progress';
import TodoInput from './TodoInput'

var todos = [
  {
    todoTitle: 'Task #1',
    todoDescription: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. Its also called placeholder (or filler) text. Its a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout.',
    todoPriority: 'medium'
  },
  {
    todoTitle: 'Task#2',
    todoDescription: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. Its also called placeholder (or filler) text. Its a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout.',
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


 handleEditTodo(todo) {
  this.setState({todos: [...this.state.todos, todo]});
}


  render() {
    return (
      <div className="container">
          <h3> Link User List By Id Here</h3>

          <div className="tasks-sidebar">
            <TodoInput onAddTodo={this.handleAddTodo}/>
            <br/>  
            <Progress />     
          </div>

   
          <div className="tasks-main">
          <div className="todo-list-header">
            <img className="todo-list-header" src={require("../images/list-icon.png")} alt="list-icon" />
            Todo Count: <span className="badge badge-pill badge-primary">{this.state.todos.length}</span>
          </div>
          
          <div className="col">
            <ul className="list-group">
              { this.state.todos.map((todo, index) =>
                <li className="list-group-item" key={index}>
                    <h4 className="list-group-item-heading">{todo.todoTitle} <small><span className="badge badge-secondary">{todo.todoPriority}</span></small></h4>
                    <p className="text-justify">{todo.todoDescription}</p>
                    <table id="task-edit-table">
                      <tbody>
                        <tr id="row0">
                          <td id="Mark Complete"> Complete </td>
                          <td id="Edit"><button className="btn btn-warning btn-sm float-right" onClick={this.handleEditTodo.bind(this, index)}><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp; Edit</button></td>
                          <td id="Deleate"><button className="btn btn-danger btn-sm float-right" onClick={this.handleRemoveTodo.bind(this, index)}><span><i className="fa fa-trash-o" aria-hidden="true"></i></span>&nbsp;&nbsp; Delete</button></td>
                        </tr>
                      </tbody>
                    </table>
                </li>
              )}
            </ul>
          </div>
          </div>
      </div>     
    );
  }
}


export default TasksDash;


