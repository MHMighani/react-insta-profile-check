import React, { useState, useEffect } from 'react';
import { getAllUsersInfo, deleteUser } from '../api/api.js';
import Slider from './slider/Slider';
import DisplayAllUsers from './DisplayAllUsers';
import { profilePicsHistoryOfUser } from '../api/api';

const AllUsers = () => {
	const [userData, setUserData] = useState([]);
	const [profilePicsHistory, setProfilePicsHistory] = useState([]);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			const savedUsersInformation = await getAllUsersInfo();
			setUserData(savedUsersInformation);
		};
		fetch();
	}, []);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const deleteOne = (userId) => {
		deleteUser(userId);
		const filteredData = userData.filter((user) => user.profile_id !== userId);
		setUserData(filteredData);
	};

	const imageClicked = async (profile_id) => {
		const profilePics = await profilePicsHistoryOfUser(profile_id);
		setProfilePicsHistory(profilePics);
		toggleModal();
	};

	return (
		<div className="ui container">
			<DisplayAllUsers allUsers={userData} deleteOne={deleteOne} imageClickedFunc={imageClicked} />
			<Slider showModal={showModal} toggleModal={toggleModal} pics={profilePicsHistory} />
		</div>
	);
};

export default AllUsers;
