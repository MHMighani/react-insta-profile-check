import React from 'react';

const ValueStyler = (value, parameterChanged) => {
	let output = value;
	let style = { padding: '5px 5px', color: 'white' };

	if (value === '') {
		output = 'empty';
		style = { ...style, background: 'blue' };
	} else if (parameterChanged === 'profile_pic_url') {
		output = <img className="ui avatar image tiny" src={value} alt="profile pic" />;
	} else if (parameterChanged === 'is_active') {
		output = value === 1 ? 'active' : 'deactived';
		style = { ...style, background: 'gray' };
	} else if (parameterChanged === 'is_private') {
		output = value === 1 ? 'public' : 'private';
		style = { ...style, background: 'purple' };
	} else {
		style = { ...style, color: 'black' };
	}
	return <b style={style}>{output}</b>;
};

export default ValueStyler;
