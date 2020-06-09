// Converts client image source to server address
import picNameExtractor from './components/PicNameExtractor';

const ConvertToServerSource = (profilePicUrl, profileId) => {
    let convertedProfilePicUrl = profilePicUrl;
    let serverAddress = 'http://localhost:4000/static'
	if (profilePicUrl) {
		convertedProfilePicUrl = `${serverAddress}/${profileId}/${picNameExtractor(profilePicUrl)}.jpg`;
	}

	return convertedProfilePicUrl;
};

export default ConvertToServerSource;
