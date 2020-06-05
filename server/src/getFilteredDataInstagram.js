const getUserDataInstagramApi = require('./api/api');

async function getFilteredDataInstagram(username) {
	const response = await getUserDataInstagramApi(username);

	let userInfo;

	if (response.userNotFound) {
		userInfo = {username,is_active:0};
	} else {
		userInfo = {
			profile_id: response.id,
			username,
			full_name: response.full_name,
			is_private: (response.is_private?1:0),
			biography: response.biography,
			profile_pic_url: response.profile_pic_url_hd,
			num_following: response.edge_follow.count,
			num_followers: response.edge_followed_by.count,
			external_url: (response.external_url?response.external_url:''),
			is_active: 1,
		};
	}

	return userInfo;
}

module.exports = getFilteredDataInstagram;
