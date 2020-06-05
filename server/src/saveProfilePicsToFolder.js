const saveProfilePicsMethods = require('./saveProfilePics');
const mkdirp = require('mkdirp');

function saveProfilePicsToFolder(profile_pic_url,profile_id){
    let folderPath = `./src/instagram_users_profile_pics/${profile_id}`
    mkdirp(folderPath);

	const imageName = saveProfilePicsMethods.imageNameExtracter(profile_pic_url);
    const imagePath = `${folderPath}/${imageName}.jpg`;
    
	saveProfilePicsMethods.profileImgSaver(profile_pic_url, imagePath, function () {});
}

module.exports = saveProfilePicsToFolder