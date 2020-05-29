import React from 'react';
import ValueStyler from './ValueStyler';
import ProfilePicComponent from './ProfilePicComponent';

const ListOfChanges = (props) => {
	return props.users.map(({ userId, profile_pic_url, username, changes }) => {
		return (
			<div className="item" key={userId}>
				<ProfilePicComponent username={username} imageAddress={profile_pic_url} />

				<div className="content">
					<a
						className="header"
						href={`https://instagram.com/${username}/`}
						rel="noreferrer noopener"
						target="_blank"
					>
						{username}
					</a>
					<div className="description">
						{changes.map(({ parameterChanged, newValue, changeText }, index) => {
							if (parameterChanged === 'is_active') {
								if (!+newValue) {
									return (
										<div key={index} style={{ marginTop: '1rem' }}>
											{username} has changed their username or has deactived their account!
										</div>
									);
								}
								return (
									<div key={index} style={{ marginTop: '1rem' }}>
										{username} has reactived their account !!!
									</div>
								);
							}
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

export default ListOfChanges