import axios from 'axios'
// import {resolve} from './resolve.js'

var serverAddress = `http://localhost:4000`

const getAllUsersInfo = async () => {
    let url = `${serverAddress}/all`

    const response = await axios.get(url)
    const data = await response.data.data

    return data
}


const getUserDataFromInstagram = async (username) => {
    let url = `https://www.instagram.com/${username}/?__a=1`
    let data
    try{
        const response = await axios.get(url)
        data = await response.data
    }catch(error){
        console.log(error)
    }
    

    return data
}

function addNewUserToDatabase(userData) {
    let url = `${serverAddress}/add`

    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(
        (result) => {
            return result
        }
    )
}

function deleteUser(userId) {
    let url = `${serverAddress}/delete/${userId}`

    fetch(url,{method:'DELETE'})
}

function getUsersChanges(){
    let url = `${serverAddress}/timeline`

    return fetch(url,{method:'GET'})
    .then(response=>response.json())
}

function updateUsersChanges(users_changes){
    let url = `${serverAddress}/update`

    fetch(url,{
        method:"POST",
        body: JSON.stringify(users_changes),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res=>res.json())
}


export {
    getAllUsersInfo,
    getUserDataFromInstagram,
    addNewUserToDatabase,
    deleteUser,
    getUsersChanges,
    updateUsersChanges
}