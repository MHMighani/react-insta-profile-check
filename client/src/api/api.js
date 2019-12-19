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
    
    try{
        const response = await axios.get(url)
        const data = await response.data

        return data
    }catch(error){
        const data = {error:true}
        return data
    }
    
}

const addNewUserToDatabase = async (userData) => {
    let url = `${serverAddress}/add`

    try{
        const response = await axios.post(url,userData)
        const SuccessStatus = await response.data
        return SuccessStatus
    }catch(error){
        const FailedStatus = {type:"error",errno:1062}
        return FailedStatus
    }
}

const deleteUser = async (userId) => {
    let url = `${serverAddress}/delete/${userId}`

    await axios.delete(url)
}

const getUsersChanges = async () => {
    let url = `${serverAddress}/timeline`
    
    const response = await axios.get(url)
    const data = await response.data
    
    return data
}

const updateUsersChanges = async (users_changes) => {
    let url = `${serverAddress}/update`

    await axios.post(url,users_changes)
}

const getChangesHistory = async () => {
    let url = `${serverAddress}/changes`

    const response = await axios.get(url)
    
    console.log(response)
}


export {
    getAllUsersInfo,
    getUserDataFromInstagram,
    addNewUserToDatabase,
    deleteUser,
    getUsersChanges,
    updateUsersChanges,
    getChangesHistory
}