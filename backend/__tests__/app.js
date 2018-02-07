const request = require('supertest')
const app = require('../app')

jest.mock('../models/user')
jest.mock('../models/todolist')


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

  it("Display Mock Data From User Mock", ()=>{
    return request(app).get("/user").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.user[0].name).toBe('Bob Test')
    })
  })

  it("Display Seeded Info", ()=>{
    return request(app).get("/user/1/list").then(response =>{
      expect(response.statusCode).toBe(200)
      expect(response.body.user.name).toBe('Bob Test')
    })
  })


  it("")


})
