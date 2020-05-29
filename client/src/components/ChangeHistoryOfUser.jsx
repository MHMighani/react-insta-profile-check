import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistoryChangeOfUser } from '../api/api';
import ChangeHistoryList from './ChangeHistoryList';
import Modal from './Modal';

const ChangeHistoryOfUser = (props) => {
	const [changeList, setChangeList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const changeList = await getHistoryChangeOfUser(props.match.params.id);
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
	return <Modal title={`user's change history`} content={content} actions={renderActions()} />;
};

export default ChangeHistoryOfUser;
