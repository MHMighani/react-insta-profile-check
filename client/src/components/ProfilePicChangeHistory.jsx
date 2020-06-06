import React from 'react';
import PicNameExtractor from './PicNameExtractor';
import ProfilePicComponent from './ProfilePicComponent';

const ProfilePicChangeHistory = ({header,username,oldPicUrl,newPicUrl,profile_id}) => {
	const oldPicName = PicNameExtractor(oldPicUrl);
	const newPicName = PicNameExtractor(newPicUrl);
	const oldValueAddress = `http://localhost:4000/static/${profile_id}/${oldPicName}.jpg`;
	const newValueAddress = `http://localhost:4000/static/${profile_id}/${newPicName}.jpg`;
	return (
		<React.Fragment>
			<div className="content">
				{header}
				<div className="description">
					profile pic changed from
					<ProfilePicComponent username={username} imageAddress={oldValueAddress} />
					to
					<ProfilePicComponent username={username} imageAddress={newValueAddress} />
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProfilePicChangeHistory;
