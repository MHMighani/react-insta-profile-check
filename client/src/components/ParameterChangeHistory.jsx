import React from 'react';
import ValueStyler from './ValueStyler';
import ProfilePicComponent from './ProfilePicComponent';
import ChangeParameterText from './ChangedParameterText';

const ParameterChangeHistory = ({ header, changedParameter, oldValue, newValue, profilePicUrl, username }) => {
	return (
		<React.Fragment>
			<ProfilePicComponent username={username} imageAddress={profilePicUrl} />
			<div className="content">
				{header}
				<div className="description" style={{ marginTop: '.5rem' }}>
					<ChangeParameterText changedParameter={changedParameter} /> changed from{' '}
					{ValueStyler(oldValue, changedParameter)} to {ValueStyler(newValue, changedParameter)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default ParameterChangeHistory;
