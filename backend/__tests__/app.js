const request = require('supertest')
const app = require('../app')

jest.mock('../models/user')
jest.mock('../models/todolist')
jest.mock('../models/task')


describe("App", ()=>{
  it("Tests the root path", ()=>{
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200)
    })
  })

  it("User Endpoint Loads", ()=>{
    return request(app).get("/user").then(response =>{
      expect(response.statusCode).toBe(200)
    })
  })

  it("Endpoint for List of Users", ()=>{
    return request(app).get("/user").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.user[0].name).toBe('Bob Test')
    })
  })

  it("Endpoint for User and todo lists", ()=>{
    return request(app).get("/user/1/list").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.user.name).toBe('Bob Test')
      expect(response.body.lists[0].title).toBe('Test List')
    })
  })

  it("Endpoint for todo list and tasks", ()=> {
    return request(app).get("/list/1/tasks").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.tasks[0].desc).toContain('Test')
    })
  })
})
