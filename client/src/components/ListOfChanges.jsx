import React from 'react';
import ValueStyler from './ValueStyler';
import ProfilePicComponent from './ProfilePicComponent';
import PicNameExtractor from './PicNameExtractor';

const ListOfChanges = (props) => {
	return props.users.map(({ profile_id, profile_pic_url, username, changes }) => {
		profile_pic_url = `http://localhost:4000/static/${profile_id}/${PicNameExtractor(profile_pic_url)}.jpg`;
		return (
			<div className="item" key={profile_id}>
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
