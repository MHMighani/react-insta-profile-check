const connection = require("./connection");
var remove = require('remove')


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
        const biography = userInfo.biography
        const fullName = userInfo.fullName
        
        let is_private = 0
        if(userInfo.is_private){
            is_private = 1
        }else{
            is_private = 0
        }

        const profile_id = userInfo.profile_id
        const num_following = userInfo.num_following.count
        const num_followers = userInfo.num_followers.count

        const sqlQuery = `insert into insta_profile_info(
         profile_id,username,profile_pic_url,biography,full_name,is_private,
         num_following,num_followers)
         values('${profile_id}','${userName}','${profile_pic_url}','${biography}',
                '${fullName}','${is_private}','${num_following}','${num_followers}'
         )`

        connection.query(sqlQuery,function(err,data){
            if(err) cb(err,null)
            cb(data,null)
        }) 
    },

    //deleting a user
    deleteUser:function(userId,cb){
        sqlQuery = `delete from insta_profile_info where profile_id='${userId}'`
        const profile_pic_folder_path = 'instagram_users_profile_pics'
        connection.query(sqlQuery,function(err,data){
            if(err){
                console.log(err);
                cb(err,null)
            }else{
                cb(data,null)

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
            console.log(changeQuery);
            

            const mainSqlQuery = `update insta_profile_info\nset ${changeQuery}\nwhere profile_id = '${userId}';`

            return mainSqlQuery
        })
        
        sqlQuery = sqlQuery[0]
        console.log(sqlQuery);
        
        
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