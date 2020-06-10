const connection = require('./connection');
const saveProfilePicsToFolder = require('../saveProfilePicsToFolder');
const editInfoBeforeAdding = require('../editInfoBeforeAdding');
const remove = require('remove');

const orm = {
	//retrieves all information
	selectAll: function (cb) {
		const sqlQuery = `
      select t1.*,count(t2.change_id) as total_change
      from insta_profile_info t1
      left join instagram_change_history t2
      on t1.profile_id = t2.user_id
      group by t1.profile_id;
    `;

		connection.query(sqlQuery, function (err, data) {
			if (err) {
				cb(err, null);
			}
			cb(null, data);
		});
	},

	//adding new user
	addUser: function (userInfo, cb) {
		const editedInfo = editInfoBeforeAdding(userInfo);

		const {
			profile_id,
			username,
			profile_pic_url,
			biography,
			full_name,
			is_private,
			external_url,
			num_following,
			num_followers,
		} = editedInfo;

		// sqlQuery for adding a user
		const sqlQuery = `insert into insta_profile_info(
         profile_id,username,profile_pic_url,biography,full_name,is_private,external_url,
         num_following,num_followers)
         values('${profile_id}','${username}','${profile_pic_url}','${biography}',
                '${full_name}','${is_private}','${external_url}','${num_following}','${num_followers}'
         );
         insert into profile_pic_history(profile_id,profile_pic_name) values('${profile_id}','${profile_pic_url}');`;

		connection.query(sqlQuery, function (err, data) {
			if (err) {
				console.log(err);
				cb(err, null);
			} else {
				console.log(`${username} successfully added to database!!`);
				cb(data, null);
			}
		});
	},

	//deleting a user
	deleteUser: function (profile_id, cb) {
		sqlQuery = `
                delete from instagram_change_history where user_id='${profile_id}';
                delete from insta_profile_info where profile_id='${profile_id}';
                delete from profile_pic_history where profile_id='${profile_id}';`;

		const profile_pic_folder_path = 'instagram_users_profile_pics';
		connection.query(sqlQuery, function (err, data) {
			if (err) {
				console.log(err);
				cb(err, null);
			} else {
				cb(null, data);

				//deleting user's pic folder
				remove(`${profile_pic_folder_path}/${profile_id}`, function (err) {
					if (err) {
						console.log(err);
					} else {
						console.log(`${profile_id} folder successfully deleted`);
					}
				});
			}
		});
	},

	//updating user's information after changing
	updatingUser: async function (changes, cb) {
		//sql query for updating user's information after it is changed
		let sqlQuery = changes.map((userChange) => {
			const profile_id = userChange.profile_id;

			let changeQuery = userChange.changes.map((change) => {
				column = change.parameterChanged;
				newValue = change.newValue;
				return `${column} = '${newValue}'`;
			});

			let historyChangeQuery = userChange.changes.map((change) => {
				column = change.parameterChanged;
				newValue = change.newValue;
				oldValue = change.oldValue;

				let profilePicQuery = '';
				const changeHistoryQuery = `insert into instagram_change_history(user_id,changed_parameter,old_value,new_value) values('${profile_id}','${column}','${oldValue}','${newValue}');`;
				if (change.parameterChanged === 'profile_pic_url') {
					profilePicQuery = `insert into profile_pic_history(profile_id,profile_pic_name) 
		  values('${profile_id}','${newValue}');`;
					saveProfilePicsToFolder(change.newValue, profile_id);
				}
				return changeHistoryQuery + profilePicQuery;
			});

			changeQuery = changeQuery.join(',');

			const historyQuery = historyChangeQuery.join('');
			const mainInfoQuery = `update insta_profile_info\nset ${changeQuery}\nwhere profile_id = '${profile_id}';`;
			const mainSqlQuery = mainInfoQuery + historyQuery;

			return mainSqlQuery;
		});

		async function queryToDataBase(sqlQuery) {
			connection.query(sqlQuery, function (err, data) {
				if (err) {
					console.log(err);

					return cb(err, null);
				}
				return cb(null, data);
			});
		}

		sqlQuery.forEach(async (query) => {
			await queryToDataBase(query);
		});
	},

	getChangesHistory: function (cb) {
		const sqlQuery = `
      select t1.*,t2.username,t2.profile_pic_url
      from instagram_change_history t1
      left join insta_profile_info t2
      on t1.user_id = t2.profile_id;
      `;

		connection.query(sqlQuery, function (err, data) {
			if (err) cb(err, null);
			cb(null, data);
		});
	},

	getChangesHistoryOfUser: function (username, cb) {
		console.log(username);
		const sqlQuery = `
			select t1.*,t2.username,t2.profile_pic_url
			from instagram_change_history t1
			left join insta_profile_info t2
			on t1.user_id = t2.profile_id
			where t2.username = '${username}';
    `;

		connection.query(sqlQuery, function (err, data) {
			if (err) {
				console.log(err)
				cb(err, null);
			} else {
				cb(null, data);
			}
		});
	},

	getProfilePicHistoryOfUser: function (profile_id, cb) {
		const sqlQuery = `
      select * from profile_pic_history where profile_id='${profile_id};'
    `;

		connection.query(sqlQuery, function (err, data) {
			if (err) cb(err, null);
			cb(null, data);
		});
	},

	deleteSinglePicture: function (pic_history_id, cb) {
		const sqlQuery = `
      delete from profile_pic_history where id=${pic_history_id};
    `;
		connection.query(sqlQuery, function (err, data) {
			if (err) cb(err, null);
			cb(null, data);
		});
	},
};

module.exports = orm;
