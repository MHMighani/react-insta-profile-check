import React, { useState, useEffect } from 'react';
import { getUsersChanges, updateUsersChanges } from '../api/api.js';
import Spinner from './Spinner';
import NoChangesComponent from './NoChangesComponent';
import ListOfChanges from './ListOfChanges';


const Timeline = () => {
	const [usersChangeInfo, setUsersChangeInfo] = useState([]);
	const [spinnerStatus, setSpinnerStatus] = useState(true);

	useEffect(() => {
		const fetch = async () => {
			const usersChanges = await getUsersChanges();

			setSpinnerStatus(false);

			setUsersChangeInfo(usersChanges);
		};
		fetch();
	}, []);

	if (spinnerStatus) {
		return <Spinner />;
	}
	
	const usersChanges = usersChangeInfo;
	let message;

	if (usersChanges.length === 0) {
		message = <NoChangesComponent section="timeline" />;
	} else {
		message = <ListOfChanges users={usersChanges} />;
		updateUsersChanges(usersChanges);
	}

	return (
		<div className="ui list relaxed divided" style={{ margin: '2rem' }}>
			{message}
		</div>
	);
};

export default Timeline;
