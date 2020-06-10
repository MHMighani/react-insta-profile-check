import React from 'react';
import UserInformation from './UserInformation';
import NoChangesComponent from './NoChangesComponent';

const DisplayAllUsers = (props) => {
	return props.allUsers.length ? (
		<div className="ui four column celled grid">
			{props.allUsers.map((user, index) => {
				const userInformation = {
					...user,
					buttonText: { text: 'Delete', icon: 'delete icon', info: user.profile_id },
					
					bio_is_active: 1,
				};

				return (
					<div key={index} className="sixteen wide phone eight wide tablet four wide computer column">
						<UserInformation
							action="delete"
							userInformation={userInformation}
							buttonFunc={props.deleteOne}
							imageClickedFunc={props.imageClickedFunc}
						/>
					</div>
				);
			})}
		</div>
	) : (
		<NoChangesComponent section="all_users" />
	);
};

export default DisplayAllUsers;
