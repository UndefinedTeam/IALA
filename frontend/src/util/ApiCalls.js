
const API = "http://localhost:3001"

<<<<<<< HEAD
function fetchUser(token) {
    return fetch(`${API}/user?authToken=${token}`)
=======
function fetchUser() {
    return fetch(`${API}/users`)
>>>>>>> master
    .then((res) => {
        return res.json()
    })
}

function addNewUser(params){
<<<<<<< HEAD
    return fetch(`${API}/user`, {
=======
    return fetch(`${API}/users`, {
>>>>>>> master
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST"
    })
    .then((res) => {
        return res.json()
    })
}

function fetchUserLists(id){
    return fetch(`${API}/users/${id}/list`)
    .then((res) => {
        console.log("Lists:",res)
        return res.json()
    })
}

function fetchListTasks(listId){
    return fetch(`${API}/lists/${listId}/tasks`)
    .then((res) => {
        console.log("Tasks:", res)
        return res.json()
    })
}

//in process
// function destroyList(listId){
//     return fetch(`${API}/users/${id}/list`,
//         {
//
//         })
//
// }
//
// function createList(id){
//
// }
//
// function createTask(listId){
//
// }
//
// function destroyTask(listId){
//
// }


module.exports = {
    fetchUser: fetchUser,
    addNewUser: addNewUser,
    fetchUserLists: fetchUserLists,
    fetchListTasks: fetchListTasks,
}
