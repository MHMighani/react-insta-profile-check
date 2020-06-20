import axios from 'axios';

var serverAddress = `http://localhost:4000`;

export const getAllUsersInfo = async () => {
	let url = `${serverAddress}/all`;

	const data = await axios.get(url).then(res => res.data);

	return data;
};

export const getUserDataFromInstagram = async (username) => {
	let url = `https://www.instagram.com/${username}/?__a=1`;
	let data
	try {
		const response = await axios.get(url);
		data = await response.data;

	} catch (error) {
		data = { error: true };		
	} finally{
		return data
	}
};

export const addNewUserToDatabase = async (username) => {
	let url = `${serverAddress}/add/${username}`;

	let response
	try {
		response = await axios.post(url)
	} catch (error) {
		response  = { error,status:501, type: 'error', errno: 1062 };
	} finally {
		return await response
	}
};

export const deleteUser = async (userId) => {
	let url = `${serverAddress}/delete/${userId}`;

	return await axios.delete(url);
};

export const getUsersChanges = async () => {
	let url = `${serverAddress}/timeline`;

	const data = axios.get(url).then(res => res.data);

	return data;
};

export const updateUsersChanges = async (users_changes) => {
	let url = `${serverAddress}/update`;

	await axios.post(url, users_changes);
};

export const getChangesHistory = async () => {
	let url = `${serverAddress}/changes`;

	const data = await axios.get(url).then(res => res.data);

	return data;
};

export const profilePicsHistoryOfUser = async (profile_id) => {
	let url = `${serverAddress}/profile_images_history/${profile_id}`;

	const data = axios.get(url).then(res => res.data);

	return data;
};

export const getHistoryChangeOfUser = async (username) => {
	let url = `${serverAddress}/userChangesHistory/${username}`;

	const historyOfUserData = axios.get(url).then(res => res.data);

	return historyOfUserData;
};

export const deleteUserPicture = async (user_id, picture_name, pic_history_id) => {
	let url = `${serverAddress}/deleteUserPicture/${user_id}/${picture_name}/${pic_history_id}`;

	await axios.get(url);
};
