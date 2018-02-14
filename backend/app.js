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

  const authorization = function(req, res, next){
    const token = req.query.authToken || req.body.authToken
    console.log("Token:", token)
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
  })

  app.get('/login/:email', (req, res) => {
    console.log(req.params.email);
    User.findOne({
      where:{email: req.params.email}
    })
    .then(user => {
      res.json({
        token: user.authToken,
        expiration: user.authTokenExpiration
      })
      console.log(user.authToken);
    })
    .catch(error => {
      res.json({message: "Failed to retrieve authToken"})
    })
  })

  app.post('/login', (req,res) => {
    User.findOne({
      where:{email: req.body.email}
    })
    .then( user => {
      if(user.verifyPassword(req.body.password)) {
        user.setAuthToken()
        user.update({
          authToken: user.authToken
        })
        .then(user => {
          res.json({token: user.authToken})
        })
        .catch(error => {
          res.json({message: "Unabale to set auth token"})
        })
      } else {
        res.status(401)
        res.json({message: "Invalid Password"})
      }
    })
    .catch(error => {
      res.json({message: "Unable to log in"})
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

  app.post('/users', (req, res) => {
      User.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          zip: req.body.zip
      })
      .then((user) =>{
          res.status(201)
          res.json({
              user: user
          })
      })
      .catch((err)=>{
          res.status(404)
          res.json("Error:", err)
      })
  })

  app.get('/lists', (req, res) => {
    TodoList.findAll().then((lists) => {
      res.json({
          lists: lists
      })
    })
  })

  app.get('/users/:id/list', (req, res) => {
      User.findById(req.params.id)
      .then((user) => {
          TodoList.findAll({
              where: {
                  userId: user.id
              }
          })
          .then((lists) => {
              res.json({
                  lists: lists
              })
          })
          .catch((error) => {
              res.send(error)
          })
      })
      .catch((error) => {
          res.send(error)
      })
  })

  app.get('/lists/:id/tasks', (req, res) => {
      TodoList.findById(req.params.id).then((list) => {
          Task.findAll({
              where: {
                  todoListId: list.id
              }
          }).then((tasks) => {
              res.json({
                  tasks: tasks
              })
          })
      }).catch((error) => {
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
      }).then((response) => {
      //return entire json object from yelp
      res.json(response.jsonBody)
      }).catch(e => {
          console.log(e)
      })
  })

module.exports = app
