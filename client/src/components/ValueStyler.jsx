import React from 'react';

const ValueStyler = (value, parameterChanged) => {
	let output = value;
	let backgroundColor;
	let style = { padding: '5px 5px', color: 'white' };

	if (value === '') {
		output = 'empty';
		style = { ...style, background: 'blue' };
	} else if (parameterChanged === 'profile_pic_url') {
		output = <img className="ui avatar image tiny" src={value} alt="profile pic" />;
	} else if (parameterChanged === 'is_active') {
		output = +value ? 'active' : 'deactived';
		backgroundColor = +value ? 'green' : 'red';
		style = { ...style, background: backgroundColor };
	} else if (parameterChanged === 'is_private') {
		output = +value ? 'private' : 'public';
		backgroundColor = +value ? 'red' : 'green';
		style = { ...style, background: backgroundColor };
	} else {
		style = { ...style, color: 'black' };
	}
	return <b style={style}>{output}</b>;
};

export default ValueStyler;
