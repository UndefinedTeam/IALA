var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var User = require('./models').User
var TodoList = require('./models').TodoList

app.use(express.static('public'))
app.use(bodyParser.json())

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


//.then doesn't get called
//app.get('/user/:id/list', function(req, res){
  //User.findById(req.params.id,
    //{include: [{
     // model: TodoList,
     // as: 'todoLists'
   // }]
 // }).then(function(user){
  //  console.log(user);
   // res.json({user: user, todoLists: user.todoLists})
 // }).catch(function(error){
 //   res.send(error)
//  })
//})

module.exports = app
