const axios = require('axios')

const getUserDataFromInstagram = async (username) => {
    let url = `https://www.instagram.com/${username}/?__a=1`
    
    try{
        const response = await axios.get(url)
        const data = await response.data
        return data.graphql.user
    }catch(error){
        if(error.response.status === 404){
            return {
                username,
                userNotFound:true
            }
        }
        
    }
    

    
}

module.exports = getUserDataFromInstagram