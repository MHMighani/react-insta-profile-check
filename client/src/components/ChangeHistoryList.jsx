import React from 'react';
import ProfilePicChangeHistory from './ProfilePicChangeHistory';
import ParameterChangeHistory from './ParameterChangeHistory';
import ChangeComponentHeader from './ChangeComponentHeader';
import convertToServerSource from '../convertToServerSource';

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
				
				profile_pic_url = convertToServerSource(profile_pic_url,user_id);

				const header = (
					<ChangeComponentHeader
						dateModified={date_modified}
						username={username}
					/>
				);

				let changeText;
				if (changed_parameter === 'profile_pic_url') {
					changeText = (
						<ProfilePicChangeHistory
							header={header}
							username={username}
							profile_id={user_id}
							oldPicUrl={old_Value}
							newPicUrl={new_Value}
						/>
					);
				} else {
					changeText = (
						<ParameterChangeHistory
							header={header}
							changedParameter={changed_parameter}
							oldValue={old_Value}
							newValue={new_Value}
							username={username}
							profilePicUrl={profile_pic_url}
						/>
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
