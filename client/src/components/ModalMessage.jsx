import React from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import history from '../history';
import { deleteUser as deleteUserApi } from '../api/api';
import { addNewUserToDatabase as addUserApi } from '../api/api';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



const ModalMessage = (props) => {
	const { action, username } = props.match.params;

	const actionButton = () => {
		const { action, id, username } = props.match.params;

		if (action === 'delete') {
			deleteUser(id);
		} else if (action === 'add') {
			const response = addUser(username);
		}
	};

	const deleteUser = async (id) => {
		const response = await deleteUserApi(id);

		if(response.status === 200){
			toast.success('user successfully deleted')
		}else{
			toast.fail(`couldn't delete user`)
		}
		history.push('/allusers');
	};

	const addUser = async (username) => {
		const response = await addUserApi(username);
		
		if(response.status === 200){
			toast.success(`${username} successfully added.`)
		}else if(response.status === 501){
			toast.error(`${username} user exists!!`)
		}else{
			toast(`can't add ${username}.`)
		}
		history.push('/add');
	};

	const renderActions = () => {
		const { action } = props.match.params;
		return (
			<React.Fragment>
				<Link to={action === 'delete' ? '/allusers' : '/add'} className="ui button">
					cancel
				</Link>
				<button className="ui button negative" onClick={() => actionButton()}>
					{props.match.params.action}
				</button>
			</React.Fragment>
		);
	};

	const renderContent = (action, username) => {
		let message = 'Are you sure you want to do this?';
		if (action === 'add') {
			message = `Are you sure you want to Add ${username} ?`;
		} else if (action === 'delete') {
			message = `Are you sure you want to delete ${username}?`;
		}
		return message;
	};

	const renderTitle = (action) => {
		let title = 'Are you sure';
		if (action === 'add') {
			title = 'Add user';
		} else if (action === 'delete') {
			title = 'Delete user';
		}
		return title;
	};

	return (
			<Modal
				title={renderTitle(action)}
				content={renderContent(action, username)}
				actions={renderActions()}
				onDismiss={() => history.push('/allusers')}
			/>
	);
};

export default ModalMessage;
