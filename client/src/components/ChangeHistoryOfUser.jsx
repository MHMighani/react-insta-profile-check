import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistoryChangeOfUser } from '../api/api';
import ChangeHistoryList from './ChangeHistoryList';
import Modal from './Modal';

const ChangeHistoryOfUser = (props) => {
	const [changeList, setChangeList] = useState([]);
	const username = props.match.params.username;
	useEffect(() => {
		const fetchData = async () => {
			const changeList = await getHistoryChangeOfUser(username);
			setChangeList(changeList);
		};
		fetchData();
	});

	const renderActions = () => {
		return (
			<React.Fragment>
				<Link to="/allusers" className="ui button primary">
					ok
				</Link>
			</React.Fragment>
		);
	};

	const content = <ChangeHistoryList changeHistoryArray={changeList} />;
	return <Modal title={`${username}'s change history`} content={content} actions={renderActions()} />;
};

export default ChangeHistoryOfUser;
