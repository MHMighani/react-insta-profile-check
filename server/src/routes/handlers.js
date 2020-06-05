const express = require('express');
const router = express.Router();
const fs = require('fs');
const getFilteredDataFromInstagram = require('../getFilteredDataInstagram');

// function imports
const getUsersInfoChangeList = require('../getUsersInfoChangeList');
const saveProfilePicsToFolder = require('../saveProfilePicsToFolder');

const orm = require('../config/orm');

router.get('/all', (req, res) => {
	orm.selectAll(function (err, users) {
		if (err) {
			res.status(501).json({
				message: "couldn't query database",
			});
		}
		res.json({ data: users });
	});
});

router.post('/add/:username', async (req, res) => {
	const username = req.params.username;

	const userInfo = getFilteredDataFromInstagram(username);

	saveProfilePicsToFolder(userInfo.profile_pic_url, userInfo.profile_id);

	orm.addUser(userInfo, function (err, data) {
		if (err && err.errno === 1062) {
			res.status(501).json({
				type: 'error',
				errno: 1062,
			});
		} else {
			res.json({
				type: 'success',
			});
		}
	});
});

router.get('/timeline', (req, res) => {
	orm.selectAll(async function (err, oldListOfUsersInfo) {
		if (err) {
			return res.status(501).json({
				message: 'couldnt connect to database',
			});
		}
		
		function getChangesPromiseList(oldListOfUsersInfo) {
			let usersInfoChangeList = [];

			oldListOfUsersInfo.forEach((oldUserInfo) => {
				let promise = new Promise(async (resolve) => {
					const recentUserInfo = await getFilteredDataFromInstagram(oldUserInfo.username);
					const changesList = getUsersInfoChangeList(oldUserInfo, recentUserInfo);
					
					resolve(changesList)
				})
				usersInfoChangeList.push(promise)
			});
			return usersInfoChangeList
		}

		const resolvedArray = await Promise.all(getChangesPromiseList(oldListOfUsersInfo));
		const unEmptyChanges = resolvedArray.filter(list => Object.keys(list).length > 0)
		res.json(unEmptyChanges)
	});
});

router.delete('/delete/:id', function (req, res) {
	userId = req.params.id;

	orm.deleteUser(userId, function (err, data) {
		if (err) {
			res.status(501).json({
				message: `couldn't delete user ${userId}`,
			});
		} else {
			return res.json({ userId });
		}
	});
});

router.all('/update', (req, res) => {
	const changes = req.body;

	orm.updatingUser(changes, function (err, data) {
		if (err) {
			return res.status(501).json({
				message: "couldn't connect to database",
			});
		} else {
			return res.json(changes);
		}
	});
});

router.get('/changes', (req, res) => {
	orm.getChangesHistory(function (err, changesHistory) {
		if (err) {
			console.log('couldnt get add changes record');
		} else {
			return res.json(changesHistory);
		}
	});
});

router.get('/profile_images_history/:id', function (req, res) {
	userId = req.params.id;

	orm.getProfilePicHistoryOfUser(userId, function (err, profilePicHistory) {
		if (err) {
			console.log('couldnt get user profile pic history');
		} else {
			profilePicHistory.reverse();
			return res.json(profilePicHistory);
		}
	});
});

router.get('/userChangesHistory/:id', (req, res) => {
	const user_id = req.params.id;

	orm.getChangesHistoryOfUser(user_id, function (err, changesHistory) {
		if (err) {
			console.log('couldnt get user change record');
		} else {
			return res.json(changesHistory);
		}
	});
});

router.get('/deleteUserPicture/:user_id/:picture_name/:pic_history_id', (req, res) => {
	const user_id = req.params.user_id;
	const picture_name = req.params.picture_name;
	const pic_history_id = req.params.pic_history_id;

	console.log(user_id, picture_name);

	const path = `../instagram_users_profile_pics/${user_id}/${picture_name}`;

	fs.unlink(path, (err) => {
		if (err) {
			console.error(err);
			return;
		}

		orm.deleteSinglePicture(pic_history_id, function (err, data) {
			if (err) {
				console.log(`couldnt delete ${picture_name}`);
			} else {
				console.log(`${picture_name} successfully deleted!}`);
			}
		});
	});
});

module.exports = router;
