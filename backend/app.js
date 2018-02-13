var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
var User = require('./models').User
var TodoList = require('./models').TodoList
var Task = require('./models').Task
var apiKey = 'M6w60G2RL_F_kiACA3VphibduaHe_ge5DwPkzFgJQj6GL6fq6eWnL_VV7pxcM6iAfvc2FAHg4G-5XXysQgtX8wU7JjdJkrhz1sklOA7J8FhPgj7shUfHVKNiYt17WnYx'

const yelp = require('yelp-fusion')

const client = yelp.client(apiKey)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors())

app.get('/users', (req, res) => {
  User.findAll().then((users) => {
      res.json({
        users: users
      })
  })
})

app.get('/lists', (req, res) => {
  TodoList.findAll().then((lists) => {
    res.json({lists: lists})
  })
})

app.get('/users/:id/list', function(req, res) {
  User.findById(req.params.id).then(function(user) {
    TodoList.findAll({
      where: {
        userId: user.id
      }
    })
    .then(function(lists) {
      res.json({
      lists: lists
    })
    .catch(function(error) {
      res.send(error)
    })
  })
  .catch(function(error) {
    res.send(error)
  })
})

app.get('/lists/:id/tasks', (req, res) => {
  TodoList.findById(req.params.id).then((list) => {
    Task.findAll({
      where: {
        todoListId: list.id
      }
    }).then(function(tasks) {
        res.json({
          tasks: tasks
        })
    })
  }).catch(function(error) {
    res.send(error)
  })
})
//backend API that fetches info from yelp
//searches yelp and returns the results in a json body
//https://www.npmjs.com/package/yelp-fusion <--yelps NPM package
app.get('/yelp/:search/:location', (req, res) => {
  console.log(req.params.search)
  console.log(req.params.location)

  client.search({
    term: req.params.search,
    location: req.params.location
  }).then(response => {
    //return entire json object from yelp
    res.json(response.jsonBody)

  }).catch(e => {
    console.log(e)
  })
})

module.exports = app
