import React from 'react';
import DateComponent from './DateComponent';

const ChangeComponentHeader = ({ dateModified, username }) => {
	const profileLinkAddress = `https://www.instagram.com/${username}/`;
	const userLink = (
		<a href={profileLinkAddress} rel="noopener noreferrer" target="_blank">
			{username}
		</a>
	);

	const header = (
		<div className="header">
			{userLink}
			<DateComponent date={dateModified} />
		</div>
	);

	return header;
};

export default ChangeComponentHeader;
