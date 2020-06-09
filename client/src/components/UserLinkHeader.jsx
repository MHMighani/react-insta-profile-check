import React from 'react'

const UserLinkHeader = ({username}) => {
    const profileLinkAddress = `https://www.instagram.com/${username}/`;
	
	return (
		<a href={profileLinkAddress} rel="noopener noreferrer" target="_blank">
			{username}
		</a>
    );
}

export default UserLinkHeader
