const getUserDataFromInstagram = require('./api/api.js')
const imageNameExtracter = require('./saveProfilePics.js')
fetch = require('node-fetch')

function findDifferences(oldUserInfo){
    username = oldUserInfo.username

    return getUserDataFromInstagram(username)
        .then(result=>{
            userInfo = result.graphql.user
            const info = 
                {
                    profile_id:userInfo.id,
                    username: userInfo.username,
                    profile_pic_url: userInfo.profile_pic_url_hd,
                    biography: userInfo.biography,
                    full_name: userInfo.full_name,
                    is_private: userInfo.is_private,
                }    
            return info
        }).then(info=>{

            const changeObject = {
                userId: info.profile_id,
                username: info.username,
                profile_pic_url: info.profile_pic_url,
                changes:[]
            }

            let oldImageNameString = (imageNameExtracter.imageNameExtracter(oldUserInfo.profile_pic_url))
            let imageNameString = (imageNameExtracter.imageNameExtracter(info.profile_pic_url));

            if(imageNameString!==oldImageNameString){
                changeObject.changes.push(
                    {parameterChanged:"profile_pic_url",
                    changeText:"profile picture",
                    newValue: info.profile_pic_url
                }
                    )
            }
            if(oldUserInfo.biography!==info.biography){
                changeObject.changes.push(
                    {
                    parameterChanged:"biography",
                    changeText:"biography",
                    newValue:info.biography,
                    
                    }
                )
            }
            if(oldUserInfo.is_private!==+info.is_private){
                changeObject.changes.push(
                    {
                    parameterChanged:"is_private",
                    changeText:"privacy",
                    newValue:info.is_private
                    }
                )    
                
            }
            if(oldUserInfo.full_name!==info.full_name){
                changeObject.changes.push(
                    {
                    parameterChanged:"full_name",
                    changeText:"full name",
                    newValue:info.full_name
                    }
                )
            }
            return changeObject
        }) 
}

module.exports = findDifferences