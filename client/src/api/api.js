import axios from 'axios'

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

const addNewUserToDatabase = async (userId) => {
    const response = await getUserDataFromInstagram(userId)
    const userInfo = response.graphql.user
    
    const userData= {
        profile_pic_url: userInfo.profile_pic_url_hd,
        userName: userInfo.username,
        biography: userInfo.biography,
        fullName: userInfo.full_name,
        is_private: userInfo.is_private,
        profile_id: userInfo.id,
        external_url: userInfo.external_url?userInfo.external_url:"",
        num_following: userInfo.edge_follow,
        num_followers: userInfo.edge_followed_by
    }

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
    
    return response.data
}

const profilePicsHistoryOfUser = async (profile_id) => {
    let url = `${serverAddress}/profile_images_history/${profile_id}`

    const response = await axios.get(url)

    return response.data
}

const getHistoryChangeOfUser = async (profile_id) => {
    let url = `${serverAddress}/userChangesHistory/${profile_id}`

    const response = await axios.get(url)

    return response.data
}


export {
    getAllUsersInfo,
    getUserDataFromInstagram,
    addNewUserToDatabase,
    deleteUser,
    getUsersChanges,
    updateUsersChanges,
    getChangesHistory,
    profilePicsHistoryOfUser,
    getHistoryChangeOfUser
}