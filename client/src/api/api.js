// import axios from 'axios'
// import {resolve} from './resolve.js'

var serverAddress = `http://localhost:4000`

export function getAllUsersInfo(){
    let url = `${serverAddress}/all`

    return fetch(url,{
        method: 'GET',
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then(res=>res.json())
}


export function getUserDataFromInstagram(username) {
    
    let url = `https://www.instagram.com/${username}/?__a=1`

    return fetch(url)
        .then(res=>res.json())
}

export function addNewUserToDatabase(userData) {
    let url = `${serverAddress}/add`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(
        (result) => {
            //callback for the response
        }
    );
}

export function deleteUser(userId) {
    let url = `${serverAddress}/delete/${userId}`

    fetch(url,{method:'DELETE'})
}

export function getUsersChanges(){
    let url = `${serverAddress}/timeline`

    return fetch(url,{method:'GET'})
    .then(response=>response.json())
}

export function updateUsersChanges(users_changes){
    let url = `${serverAddress}/update`

    fetch(url,{
        method:"POST",
        body: JSON.stringify(users_changes),
        headers: {'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res=>res.json())
    
}