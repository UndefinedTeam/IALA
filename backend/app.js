var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
var User = require('./models').User
var TodoList = require('./models').TodoList
var Task = require('./models').Task

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
});

app.get('/user', (req, res) => {
  User.findAll().then((user) => {
      res.json({user: user})
  })
})

app.get('/lists', (req, res) => {
  TodoList.findAll().then((todoList) => {
      res.json({todoList: todoList})
  })
})

app.get('/user/:id/list', function(req, res) {
  User.findById(req.params.id).then(function(user) {
    TodoList.findAll({
      where: {
        userId: req.params.id
      }
    }).then(function(lists) {
      res.json({user:user, lists: lists})
    })
  }).catch(function(error) {
    res.send(error)
  })
})

app.get('/list/:id/tasks', function(req, res) {
  TodoList.findById(req.params.id).then(function(list) {
    Task.findAll({
      where: {
        todoListId: req.params.id
      }
    }).then(function(tasks) {
        res.json({list:list, tasks:tasks})
    })
  }).catch(function(error) {
    res.send(error)
  })
})

module.exports = app
