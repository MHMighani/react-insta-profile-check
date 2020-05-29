import React, { useState, useEffect } from 'react';

import { getChangesHistory } from '../api/api';
import NoChangesComponent from './NoChangesComponent';
import ChangeHistoryList from './ChangeHistoryList';

const ChangesHistory = () => {
	const [changeHistory, setChangeHistory] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const changesHistoryList = await getChangesHistory();
			setChangeHistory(changesHistoryList);
		};
		fetchData();
	}, []);

	if (changeHistory.length > 0) {
		return <ChangeHistoryList changeHistoryArray={changeHistory} />;
	}

	return <NoChangesComponent section="changes" />;
};

export default ChangesHistory;
