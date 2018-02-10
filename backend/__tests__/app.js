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

    it("calls submitHandler on submit", ()=>{
        const mockSubmitHandler = jest.fn()
        const component = mount(<SignUp onSubmit={mockSubmitHandler}/>)
        component.find('button#submit').simulate('click', {button: 0})
        expect(mockSubmitHandler.mock.calls.length).toBe(1)
    })

    it("creates a new user from registration form", () => {
        const mockSubmitHandler = jest.fn()
        const component = mount(<SignUp onSubmit={mockSubmitHandler}/>)

        component.find('input[name="email"]').simulate('change', {target: {value: 'test@gmail.com', name: 'email'}})
        component.find('input[name="name"]').simulate('change', {target: {value: 'Charlie', name: 'name'}})
        component.find('input[name="password"]').simulate('change', {target: {value: 'Bears123', name: 'password'}})
        component.find('input[name="passwordConfirm"]').simulate('change', {target: {value: 'Bears123', name: 'passwordConfirm'}})
        component.find('input[name="zip"]').simulate('change', {target: {value: '92123', name: 'zip'}})
        component.find('button#submit').simulate('click', {button: 0})

        const submittedValues = mockSubmitHandler.mock.calls[0][0]

        expect(submittedValues["email"]).toBe("test@gmail.com")
        expect(submittedValues["name"]).toBe("Charlie")
        expect(submittedValues["password"]).toBe("Bears123")
        expect(submittedValues["passwordConfirm"]).toBe("Bears123")
        expect(submittedValues["zip"]).toBe("92123")
    })
})
