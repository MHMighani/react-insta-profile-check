function getUserDataFromInstagram(username) {
    
    let url = `https://www.instagram.com/${username}/?__a=1`

    return fetch(url)
        .then(res=>res.json())
}

module.exports = getUserDataFromInstagram