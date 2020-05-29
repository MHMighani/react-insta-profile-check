import React from 'react';

import Privacy from './Privacy';
import Biography from './Biography';
import { Link } from 'react-router-dom';
import picNameExtractor from './PicNameExtractor';

const UserInformation = ({ userInformation, action, imageClickedFunc }) => {
	if (userInformation && 'profile_pic_url_hd' in userInformation) {
		userInformation.profile_pic_url = userInformation.profile_pic_url_hd;
	} else if (userInformation && 'profile_pic_url' in userInformation) {
		userInformation.profile_pic_url = `http://localhost:4000/static/${
			userInformation.profile_id
		}/${picNameExtractor(userInformation.profile_pic_url)}.jpg`;
	}

	let external_url_tag = <p style={{ color: 'lightGrey', textDecoration: 'italic' }}>No external link</p>;

	if (userInformation.external_url) {
		external_url_tag = (
			<a rel="noopener noreferrer" href={userInformation.external_url} target="_blank">
				{userInformation.external_url}
			</a>
		);
	}

	if (!userInformation.username) {
		return null;
	} else {
		return (
			<div className="ui card">
				<div
					className="image small"
					onClick={() => imageClickedFunc(userInformation.profile_id)}
					style={{ cursor: 'pointer' }}
				>
					{userInformation.is_active === 0 && <label className="ui red ribbon label">Not Active</label>}
					{userInformation.total_change > 0 && (
						<div className="floating ui blue label">
							<Link to={`/userChangesHistory/${userInformation.profile_id}`}>
								{userInformation.total_change}
							</Link>
						</div>
					)}

					<img src={userInformation.profile_pic_url} alt="profile pic" />
				</div>

				<div className="content">
					<div className="header">
						<a
							href={`https://www.instagram.com/${userInformation.username}/`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{userInformation.username}
						</a>
					</div>
					{userInformation.full_name}
					<div className="discription">
						<Biography biographyText={userInformation.biography} isActive={userInformation.bio_is_active} />
						{external_url_tag}
					</div>

					<Privacy is_private={userInformation.is_private} />
				</div>

				<Link
					to={`/modalMessage/${action}/${userInformation.username}/${userInformation.profile_id}`}
					className="ui bottom attached button"
				>
					<i className={userInformation.buttonText.icon}></i>
					{userInformation.buttonText.text}
				</Link>
			</div>
		);
	}
};

export default UserInformation;
