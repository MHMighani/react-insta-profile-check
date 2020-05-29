import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="ui large inverted segment">
			<div className="ui stackable large inverted secondary pointing menu">
				<Link to="/" className="item">
					TimeLine
				</Link>
				<Link to="/allusers" className="item">
					All users
				</Link>
				<Link to="/add" className="item">
					Add user
				</Link>
				<Link to="/changes" className="item">
					Change history
				</Link>
			</div>
		</div>
	);
};

export default Navbar
