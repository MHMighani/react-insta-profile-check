import React from 'react';
import DateComponent from './DateComponent';
import valueStyler from './ValueStyler';
import PicNameExtractor from './PicNameExtractor';
import ProfilePicComponent from './ProfilePicComponent';

const ChangeHistoryList = ({ changeHistoryArray }) => {
	const changeHistoryList = changeHistoryArray
		.reverse()
		.map(
			({
				change_id,
				user_id,
				profile_pic_url,
				changed_parameter,
				username,
				date_modified,
				old_Value,
				new_Value,
			}) => {
				const profileLinkAddress = `https://www.instagram.com/${username}/`
				profile_pic_url = `http://localhost:4000/static/${user_id}/${PicNameExtractor(profile_pic_url)}.jpg`;
				const userLink = (
					<a href={profileLinkAddress} rel="noopener noreferrer" target="_blank">
						{username}
					</a>
				);
				const header = (
					<div className="header">
						{userLink}
						<DateComponent date={date_modified} />
					</div>
				);

				switch (changed_parameter) {
					case 'is_private':
						changed_parameter = 'privacy status';
						break;
					case 'is_active':
						changed_parameter = 'activation status';
						break;
					case 'external_url':
						changed_parameter = 'external link';
						break;
					default:
						break;
				}

				let changeText;
				if (changed_parameter === 'profile_pic_url') {
					const oldPicName = PicNameExtractor(old_Value);
					const newPicName = PicNameExtractor(new_Value);
					const oldValueAddress = `http://localhost:4000/static/${user_id}/${oldPicName}.jpg`;
					const newValueAddress = `http://localhost:4000/static/${user_id}/${newPicName}.jpg`;
					changeText = (
						<React.Fragment>
							<div className="content">
								{header}
								<div className="description">
									profile pic changed from
									<ProfilePicComponent username={username} imageAddress={oldValueAddress} />
									to
									<ProfilePicComponent username={username} imageAddress={newValueAddress} />
								</div>
							</div>
						</React.Fragment>
					);
				} else {
					changeText = (
						<React.Fragment>
							<ProfilePicComponent username={username} imageAddress={profile_pic_url} />

							<div className="content">
								{header}

								<div className="description" style={{ marginTop: '.5rem' }}>
									{changed_parameter} changed from {valueStyler(old_Value, changed_parameter)} to{' '}
									{valueStyler(new_Value, changed_parameter)}
								</div>
							</div>
						</React.Fragment>
					);
				}
				return (
					<div className="item" key={change_id} style={{ margin: '1rem 0' }}>
						{changeText}
					</div>
				);
			}
		);
	return (
		<div className="ui relaxed divided list" style={{ margin: '1rem 3rem' }}>
			{changeHistoryList}
		</div>
	);
};

export default ChangeHistoryList;
