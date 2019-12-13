const axios = require('axios')

const getUserDataFromInstagram = async (username) => {
    let url = `https://www.instagram.com/${username}/?__a=1`

    const response = await axios.get(url)
    const data = await response.data

    return data
}

module.exports = getUserDataFromInstagram