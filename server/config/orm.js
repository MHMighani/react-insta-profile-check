const connection = require("./connection");
const saveProfilePics = require("../saveProfilePics")
var remove = require('remove')


const getCurrentDate = () => {
    date = new Date()

    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()

    const dateString = year + '-' + month + '-' + day

    return dateString
}

const orm = {

    //retrieves all information
    selectAll:function(cb){
        const sqlQuery = `select * from insta_profile_info`

        connection.query(sqlQuery,function(err,data){
            if(err){
                cb(err,null)
            } 
            cb(null,data)
        })
    },

    //adding new user
    addUser:function(userInfo,cb){
        const profile_pic_url = userInfo.profile_pic_url
        const userName = userInfo.userName
        const biography = userInfo.biography.split('\\').join('\\\\')
        const fullName = userInfo.fullName.split('\\').join('\\\\')
        
        let is_private = 0
        if(userInfo.is_private){
            is_private = 1
        }else{
            is_private = 0
        }

        const profile_id = userInfo.profile_id
        const num_following = userInfo.num_following.count
        const num_followers = userInfo.num_followers.count

        // sqlQuery for adding a user
        const sqlQuery = `insert into insta_profile_info(
         profile_id,username,profile_pic_url,biography,full_name,is_private,
         num_following,num_followers)
         values('${profile_id}','${userName}','${profile_pic_url}','${biography}',
                '${fullName}','${is_private}','${num_following}','${num_followers}'
         )`

        connection.query(sqlQuery,function(err,data){
            if(err){
                console.log(err);
                cb(err,null)
            }else{
                cb(data,null)
            }
        })
        
        const date = getCurrentDate()
        const profile_image_number = saveProfilePics.imageNameExtracter(profile_pic_url)
        
        //sql query for adding history of a user to database

        const sqlQuery2 = `
        insert into bio_history(bio_text,date_modified,user_id) 
        values('${biography}','${date}','${profile_id}');

        insert into full_name_history(full_name,date_modified,user_id)
        values('${fullName}','${date}','${profile_id}');

        insert into profile_image_history(image_number,date_modified,user_id)
        values('${profile_image_number}','${date}','${profile_id}');
        `

        connection.query(sqlQuery2,function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log(`information of ${userName} added to history`)
            }
        })
    },

    //deleting a user
    deleteUser:function(userId,cb){
        sqlQuery1 = `
        delete from bio_history where user_id='${userId}';
        delete from full_name_history where user_id='${userId}';
        delete from profile_image_history where user_id='${userId}';
        `

        connection.query(sqlQuery1,function(err,data){
            if(err){
                console.log(err);
            }else{
                console.log("user history information completely deleted");
                
            }
        })

        sqlQuery2 = `delete from insta_profile_info where profile_id='${userId}'`
        const profile_pic_folder_path = 'instagram_users_profile_pics'
        connection.query(sqlQuery2,function(err,data){
            if(err){
                console.log(err);
                cb(err,null)
            }else{
                cb(null,data)

                //deleting user's pic folder
                remove(`${profile_pic_folder_path}/${userId}`,function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(`${userId} folder successfully deleted`);
                    }
                })
            }    
        })
    },

    //updating user's information after changing
    updatingUser:function(changes,cb){
        let sqlQuery = changes.map(userChange=>{
            const userId = userChange.userId
            
            let changeQuery = userChange.changes.map(change=>{
                column = change.parameterChanged
                newValue = change.newValue
                return (
                `${column} = '${newValue}'`
                )
            })

            changeQuery = changeQuery.join(',')
            
            

            const mainSqlQuery = `update insta_profile_info\nset ${changeQuery}\nwhere profile_id = '${userId}';`

            return mainSqlQuery
        })
        
        sqlQuery = sqlQuery[0]
        
        connection.query(sqlQuery,function(err,data){
            if(err){
                console.log(err);
                
                cb(err,null)
            }
            cb(null,data)
        })
    }
}

module.exports = orm