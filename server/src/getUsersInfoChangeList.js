const getFilteredDataInstagram = require('./getFilteredDataInstagram');
const saveProfilePicsToFolder = require('./saveProfilePicsToFolder');
const saveProfilePicsMethods = require('./saveProfilePics');

function getUsersInfoChangeList(oldUserInfo, newUserInfo) {
	const { username, profile_id } = oldUserInfo;
	const { profile_pic_url } = oldUserInfo;
	let changesWrappedByPublicInfo = [];

	const changesList = getListOfChanges(oldUserInfo, newUserInfo);

	if (changesList.length > 0) {
		changesWrappedByPublicInfo = {
			profile_id,
			username,
			profile_pic_url,
			changes: changesList,
		};
	}

	return changesWrappedByPublicInfo;
}

function getListOfChanges(oldInfo, newInfo) {
	let changeList = [];
	const {
		biography: newBiography,
		full_name: newFullName,
		external_url: newExternalUrl,
		profile_pic_url: newProfilePicUrl,
		is_active: newActivationStatus,
		is_private: newPrivacyStatus,
	} = newInfo;

	const {
		biography: oldBiography,
		full_name: oldFullName,
		external_url: oldExternalUrl,
		profile_pic_url: oldProfilePicUrl,
		is_active: oldActivationStatus,
		is_private: oldPrivacyStatus,
	} = oldInfo;

	if (newActivationStatus !== oldActivationStatus) {
		changeList.push(getChangeObject('is_active', oldActivationStatus, newActivationStatus));
	}
	if (newActivationStatus) {
		if (oldBiography !== newBiography) {
			changeList.push(getChangeObject('biography', oldBiography, newBiography));
		}
		if (oldFullName !== newFullName) {
			changeList.push(getChangeObject('full_name', oldFullName, newFullName));
		}
		if (oldExternalUrl !== newExternalUrl) {
			changeList.push(getChangeObject('external_url', oldExternalUrl, newExternalUrl));
		}
		if (checkProfilePicChange(oldProfilePicUrl, newProfilePicUrl)) {
			changeList.push(getChangeObject('profile_pic_url', oldProfilePicUrl, newProfilePicUrl));
		}
		if (oldPrivacyStatus !== newPrivacyStatus) {
			changeList.push(getChangeObject('is_private', oldPrivacyStatus, newPrivacyStatus));
		}
	}
	return changeList;
}

function getChangeObject(parameterChanged, oldValue, newValue) {
	let changeText = getChangeText(parameterChanged);
	let valueHistory = { oldValue, newValue };

	return new ChangeObject(parameterChanged, changeText, valueHistory);
}

function getChangeText(parameterChanged) {
	let changeText;
	switch (parameterChanged) {
		case 'is_active':
			changeText = 'activation';
			break;
		case 'biography':
			changeText = 'biography';
			break;
		case 'full_name':
			changeText = 'full name';
			break;
		case 'external_url':
			changeText = 'website link';
			break;
		case 'profile_pic_url':
			changeText = 'profile picture';
			break;
		case 'is_private':
			changeText = 'privacy';
			break;
		default:
			parameterChanged;
	}
	return changeText;
}

function ChangeObject(parameterChanged, changeText, valueHistory) {
	this.parameterChanged = parameterChanged;
	this.changeText = changeText;
	this.oldValue = valueHistory.oldValue;
	this.newValue = valueHistory.newValue;
}

function checkProfilePicChange(oldProfilePicUrl, newProfilePicUrl) {
	const oldImageNameString = saveProfilePicsMethods.imageNameExtracter(oldProfilePicUrl);
	const newImageNameString = saveProfilePicsMethods.imageNameExtracter(newProfilePicUrl);

	if (oldImageNameString !== newImageNameString) {
		return true;
	}
}

module.exports = getUsersInfoChangeList;
