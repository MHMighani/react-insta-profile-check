import React from 'react';
import ValueStyler from './ValueStyler';
import ProfilePicComponent from './ProfilePicComponent';
import UserLinkHeader from './UserLinkHeader';
import convertToServerSource from '../convertToServerSource';

const ListOfChanges = (props) => {
	return props.users.map(({ profile_id, profile_pic_url, username, changes }) => {
		profile_pic_url = convertToServerSource(profile_pic_url,profile_id)
		return (
			<div className="item" key={profile_id}>
				<ProfilePicComponent username={username} imageAddress={profile_pic_url} />

				<div className="content">
					<UserLinkHeader username={username} />
					<div className="description">
						{changes.map(({ parameterChanged, newValue, changeText }, index) => {
							return (
								<div key={index} style={{ marginTop: '1rem' }}>
									<b>{changeText}</b> is changed.it is now {ValueStyler(newValue, parameterChanged)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	});
};

export default ListOfChanges;
