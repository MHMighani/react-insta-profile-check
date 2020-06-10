import React from 'react';
import ProfilePicComponent from './ProfilePicComponent';
import convertToServerSource from '../convertToServerSource';

const ProfilePicChangeHistory = ({ header, username, oldPicUrl, newPicUrl, profile_id }) => {
	const oldValueAddress = convertToServerSource(oldPicUrl, profile_id);
	const newValueAddress = convertToServerSource(newPicUrl, profile_id);
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
