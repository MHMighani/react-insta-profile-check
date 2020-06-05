import axios from 'axios';

var serverAddress = `http://localhost:4000`;

export const getAllUsersInfo = async () => {
	let url = `${serverAddress}/all`;

	const response = await axios.get(url);
	const data = await response.data.data;

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
		const response = await axios.post(url);
		response = await response.data;
	} catch (error) {
		response  = { type: 'error', errno: 1062 };
	} finally {
		return response
	}
};

export const deleteUser = async (userId) => {
	let url = `${serverAddress}/delete/${userId}`;

	await axios.delete(url);
};

export const getUsersChanges = async () => {
	let url = `${serverAddress}/timeline`;

	const response = await axios.get(url);
	const data = await response.data;

	return data;
};

export const updateUsersChanges = async (users_changes) => {
	let url = `${serverAddress}/update`;

	await axios.post(url, users_changes);
};

export const getChangesHistory = async () => {
	let url = `${serverAddress}/changes`;

	const response = await axios.get(url);

	return response.data;
};

export const profilePicsHistoryOfUser = async (profile_id) => {
	let url = `${serverAddress}/profile_images_history/${profile_id}`;

	const response = await axios.get(url);

	return response.data;
};

export const getHistoryChangeOfUser = async (profile_id) => {
	let url = `${serverAddress}/userChangesHistory/${profile_id}`;

	const response = await axios.get(url);

	return response.data;
};

export const deleteUserPicture = async (user_id, picture_name, pic_history_id) => {
	let url = `${serverAddress}/deleteUserPicture/${user_id}/${picture_name}/${pic_history_id}`;

	await axios.get(url);
};
