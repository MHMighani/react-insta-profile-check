const getUserDataFromInstagram = require('./api/api.js')
const saveProfilePicsMethods = require('./saveProfilePics')
fetch = require('node-fetch')

function findDifferences(oldUserInfo){
    username = oldUserInfo.username

    return getUserDataFromInstagram(username)
        .then(userInfo=>{

            if(userInfo.userNotFound){
                return userInfo
            }
            
            const info = 
                {
                    profile_id:userInfo.id,
                    username: userInfo.username,
                    profile_pic_url: userInfo.profile_pic_url_hd,
                    biography: userInfo.biography,
                    full_name: userInfo.full_name,
                    external_url: userInfo.external_url?userInfo.external_url:"",
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

            
            if(info.userNotFound && oldUserInfo.is_active===1){
                const changeObject = {
                    userId: oldUserInfo.profile_id,
                    username: oldUserInfo.username,
                    profile_pic_url: oldUserInfo.profile_pic_url,
                    changes:[{
                        parameterChanged:"is_active",
                        changeText:"activation",
                        newValue:"0",
                        oldValue:"1"
                    }]
                }

                return changeObject
            }else if(info.userNotFound && oldUserInfo.is_active===0){
                return changeObject
            }

            
            
            let oldImageNameString = saveProfilePicsMethods.imageNameExtracter(oldUserInfo.profile_pic_url)
            let imageNameString = saveProfilePicsMethods.imageNameExtracter(info.profile_pic_url)
            const imagePath = `./instagram_users_profile_pics/${info.profile_id}/${imageNameString}.jpg`

            if(!oldUserInfo.is_active){
                changeObject.changes.push(
                    {
                        parameterChanged:"is_active",
                        changeText:"activation",
                        newValue:"1",
                        oldValue:"0"
                    }
                )
            }

            if(imageNameString!==oldImageNameString){
                changeObject.changes.push(
                    {
                    parameterChanged:"profile_pic_url",
                    changeText:"profile picture",
                    newValue: info.profile_pic_url,
                    oldValue:oldUserInfo.profile_pic_url
                }
                )
                saveProfilePicsMethods.profileImgSaver(info.profile_pic_url,imagePath,function(){})
            }
            if(oldUserInfo.biography!==info.biography){
                changeObject.changes.push(
                    {
                    parameterChanged:"biography",
                    changeText:"biography",
                    newValue:info.biography.split('\\').join('\\\\'),
                    oldValue:oldUserInfo.biography
                    }
                )
            }
            if(oldUserInfo.is_private!==+info.is_private){
                changeObject.changes.push(
                    {
                    parameterChanged:"is_private",
                    changeText:"privacy",
                    newValue:info.is_private?"1":"0",
                    oldValue:oldUserInfo.is_private?"1":"0"
                    }
                )    
                
            }
            if(oldUserInfo.full_name!==info.full_name){
                changeObject.changes.push(
                    {
                    parameterChanged:"full_name",
                    changeText:"full name",
                    newValue:info.full_name.split('\\').join('\\\\'),
                    oldValue:oldUserInfo.full_name
                    }
                )
            }
            if(oldUserInfo.external_url!==info.external_url){
                changeObject.changes.push(
                    {
                    parameterChanged:"external_url",
                    changeText:"website link",
                    newValue:info.external_url,
                    oldValue:oldUserInfo.external_url
                    }
                )
            }
            return changeObject
        }) 
}

module.exports = findDifferences