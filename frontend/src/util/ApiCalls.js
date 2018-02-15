
const API = "http://localhost:3001"

function fetchUser() {
    let token = localStorage.getItem('authToken')
    return fetch(`${API}/user?authToken=${token}`)
    .then((res) => {
        return res.json()
    })
}


function addNewUser(params){
   return fetch(`${API}/user`, {
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
    return fetch(`${API}/user/${id}/lists`)
    .then((res) => {
        console.log("Lists:",res)
        return res.json()
    })
}

function fetchListTasks(listId){
    return fetch(`${API}/list/${listId}/tasks`)
    .then((res) => {
        console.log("Tasks:", res)
        return res.json()
    })
}

function createList(id, params){
    return fetch(`${API}/user/${id}/lists`,
        {
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

//in process
// // function updateList(id, params){
//
// }

// function destroyList(id){
//     return fetch(`${API}/users/${id}/list`,
//         {
//
//         })
//
// }
//

function createTask(listId, params){
    return fetch(`${API}/list/${listId}/tasks`,
        {
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

//in process
// function updateTask(){
//
// }

// function destroyTask(listId){
//
// }


module.exports = {
    fetchUser: fetchUser,
    addNewUser: addNewUser,
    createList: createList,
    createTask: createTask,
    fetchUserLists: fetchUserLists,
    fetchListTasks: fetchListTasks,
}
