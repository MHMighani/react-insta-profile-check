const connection = require("./connection");
const saveProfilePics = require("../saveProfilePics");
var remove = require("remove");

const getCurrentDate = () => {
  date = new Date();

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const dateString = year + "-" + month + "-" + day;

  return dateString;
};

const orm = {
  //retrieves all information
  selectAll: function(cb) {
    const sqlQuery = `
      select t1.*,count(t2.change_id) as total_change
      from insta_profile_info t1
      left join instagram_change_history t2
      on t1.profile_id = t2.user_id
      group by t1.profile_id;
    `;

    connection.query(sqlQuery, function(err, data) {
      if (err) {
        cb(err, null);
      }
      cb(null, data);
    });
  },

  //adding new user
  addUser: function(userInfo, cb) {
    const profile_pic_url = userInfo.profile_pic_url;
    const userName = userInfo.userName;
    let biography = userInfo.biography.split("\\").join("\\\\");
    biography = biography.split(`'`).join(`\\'`);
    let fullName = userInfo.fullName.split("\\").join("\\\\");
    const external_url = userInfo.external_url;

    let is_private = 0;
    if (userInfo.is_private) {
      is_private = 1;
    } else {
      is_private = 0;
    }

    const profile_id = userInfo.profile_id;
    const num_following = userInfo.num_following.count;
    const num_followers = userInfo.num_followers.count;

    // sqlQuery for adding a user
    const sqlQuery = `insert into insta_profile_info(
         profile_id,username,profile_pic_url,biography,full_name,is_private,external_url,
         num_following,num_followers)
         values('${profile_id}','${userName}','${profile_pic_url}','${biography}',
                '${fullName}','${is_private}','${external_url}','${num_following}','${num_followers}'
         );
         insert into profile_pic_history(profile_id,profile_pic_name) values('${profile_id}','${profile_pic_url}');`;

    connection.query(sqlQuery, function(err, data) {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(data, null);
      }
    });
  },

  //deleting a user
  deleteUser: function(userId, cb) {
    sqlQuery = `
                delete from instagram_change_history where user_id='${userId}';
                delete from insta_profile_info where profile_id='${userId}';
                delete from profile_pic_history where profile_id='${userId}';`;

    const profile_pic_folder_path = "instagram_users_profile_pics";
    connection.query(sqlQuery, function(err, data) {
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, data);

        //deleting user's pic folder
        remove(`${profile_pic_folder_path}/${userId}`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`${userId} folder successfully deleted`);
          }
        });
      }
    });
  },

  //updating user's information after changing
  updatingUser: function(changes, cb) {
    //sql query for updating user's information after it is changed
    let sqlQuery = changes.map(userChange => {
      const userId = userChange.userId;

      let changeQuery = userChange.changes.map(change => {
        column = change.parameterChanged;
        newValue = change.newValue;
        return `${column} = '${newValue}'`;
      });

      let historyChangeQuery = userChange.changes.map(change => {
        const date = getCurrentDate();
        column = change.parameterChanged;
        newValue = change.newValue;
        oldValue = change.oldValue;

        let profilePicQuery = ""
        const changeHistoryQuery = `insert into instagram_change_history(user_id,changed_parameter,old_value,new_value,date_modified) values('${userId}','${column}','${oldValue}','${newValue}','${date}');`
        if(change.parameterChanged==="profile_pic_url"){
          profilePicQuery = `insert into profile_pic_history(profile_id,profile_pic_name) 
          values('${userId}','${newValue}');`  
        }
        return changeHistoryQuery + profilePicQuery
      });

      changeQuery = changeQuery.join(",");

      const historyQuery = historyChangeQuery.join(";");

      const mainInfoQuery = `update insta_profile_info\nset ${changeQuery}\nwhere profile_id = '${userId}';`;

      const mainSqlQuery = mainInfoQuery + historyQuery;

      return mainSqlQuery;
    });

    sqlQuery = sqlQuery[0];

    connection.query(sqlQuery, function(err, data) {
      if (err) {
        console.log(err);

        cb(err, null);
      }
      cb(null, data);
    });
  },

  getChangesHistory: function(cb) {
    const sqlQuery = `
      select t1.*,t2.username,t2.profile_pic_url
      from instagram_change_history t1
      left join insta_profile_info t2
      on t1.user_id = t2.profile_id;
      `;

    connection.query(sqlQuery, function(err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  },

  getChangesHistoryOfUser: function(user_id,cb){
    const sqlQuery = `
      select t1.*,t2.username,t2.profile_pic_url
      from instagram_change_history t1
      left join insta_profile_info t2
      on t1.user_id = t2.profile_id
      where t1.user_id = ${user_id};
    `;

    connection.query(sqlQuery, function(err,data){
      if(err) cb(err,null)
      cb(null,data)
    })
  },

  getProfilePicHistoryOfUser: function(profile_id,cb){
    const sqlQuery = `
      select * from profile_pic_history where profile_id='${profile_id};'
    `

    connection.query(sqlQuery, function(err,data){
      if(err) cb(err,null)
      cb(null,data)
    })
  },

  deleteSinglePicture: function(pic_history_id,cb){
    const sqlQuery = `
      delete from profile_pic_history where id=${pic_history_id};
    `
    connection.query(sqlQuery, function(err,data){
      if(err) cb(err,null)
      cb(null,data)
    })
  }
};

module.exports = orm;