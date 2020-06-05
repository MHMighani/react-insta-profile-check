import React from 'react';

const ProfilePicComponent = ({size='tiny',imageAddress,username = ''}) => {
	return (
		<img
			className={`ui avatar image ${size}`}
			src={imageAddress}
			alt={`${username}'s profile pic`}
			style={{ margin: '0 1rem' }}
		/>
	);
};

export default ProfilePicComponent;
