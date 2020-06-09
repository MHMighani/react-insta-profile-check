import React from 'react';

import Privacy from './Privacy';
import Biography from './Biography';
import { Link } from 'react-router-dom';

import ExternalUrl from './ExternalUrl';
import ActivationLabel from './ActivationLabel';
import TotalChangeLabel from './TotalChangeLabel';
import UserLinkHeader from './UserLinkHeader';
import convertToServerSource from '../convertToServerSource';

const UserInformation = ({ userInformation, action, imageClickedFunc }) => {
	let {
		profile_id,
		username,
		external_url,
		is_active,
		is_private,
		biography,
		total_change,
		profile_pic_url_hd,
		profile_pic_url,
		buttonText,
		full_name,
		bio_is_active,
	} = userInformation;

	profile_id = profile_id ? profile_id : userInformation.id;
	profile_pic_url = profile_pic_url_hd ? profile_pic_url_hd : convertToServerSource(profile_pic_url, profile_id);

	if (!username) {
		return null;
	} else {
		return (
			<div className="ui card">
				<div className="image small" onClick={() => imageClickedFunc(profile_id)} style={{ cursor: 'pointer' }}>
					<ActivationLabel isActive={is_active} />
					<TotalChangeLabel totalChange={total_change} username={username} />
					<img src={profile_pic_url} alt="profile pic" />
				</div>

				<div className="content">
					<div className="header">
						<UserLinkHeader username={username} />
					</div>
					{full_name}
					<div className="discription">
						<Biography biographyText={biography} isActive={bio_is_active} />
						<ExternalUrl externalUrl={external_url} />
					</div>

					<Privacy is_private={is_private} />
				</div>

				<Link to={`/modalMessage/${action}/${username}/${profile_id}`} className="ui bottom attached button">
					<i className={buttonText.icon}></i>
					{buttonText.text}
				</Link>
			</div>
		);
	}
};

export default UserInformation;
