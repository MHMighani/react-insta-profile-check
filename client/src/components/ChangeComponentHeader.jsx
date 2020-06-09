import React from 'react';
import DateComponent from './DateComponent';
import UserLinkHeader from './UserLinkHeader';

const ChangeComponentHeader = ({ dateModified = null, username }) => {
	dateModified = <DateComponent date={dateModified} />

	const header = (
		<div className="header">
			<UserLinkHeader username={username} />
			{dateModified}
		</div>
	);

	return header;
};

export default ChangeComponentHeader;
