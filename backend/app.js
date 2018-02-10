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

const authorization = function(req, res, next){
  const token = req.query.authToken || req.body.authToken
  console.log(token);
  if(token){
    User.findOne({
      where: {authToken: token}
    }).then((user)=>{
      if(user){
        req.currentUser = user
        next()
      }else{
        res.status(401)
        res.json({message:'Authorization Token Invalid'})
      }
    })
  }else{
    res.status(401)
    res.json({message: 'Authorization Token Required'})
  }
}


app.get('/', (req, res) => {
  res.json({message: 'API Example App'})
});

app.post('/login', (req,res) => {
  console.log(req.body.email);
  User.findOne({
    where:{email: req.body.email},
    attributes: ['id', 'name', 'email', 'password']
  }).then( user => {
    console.log(User.verifyPassword(user.password))
  })
})

app.get('/user',
authorization ,
(req, res) => {
  res.json({user: req.currentUser})
})

app.post('/user', function(req, res){
  User.create(
    {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      zip: req.body.zip
    }
  ).then((user)=>{
    res.json({
      message: 'success',
      user: user
    })
  }).catch((error)=>{
    res.status(400)
    res.json({
      message: "Unable to create User",
      errors: error.errors
    })
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
