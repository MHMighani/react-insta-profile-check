import React from 'react';

const ValueStyler = (value, parameterChanged) => {
	let output = value;
  let style = { padding: '5px 5px',color:'white' }
	if (value === '') {
    output = 'empty';
    style = {...style,background:'blue'};
	} else if (parameterChanged === 'profile_pic_url') {
		return <img className="ui avatar image tiny" src={value} alt="profile pic" />;
	} else if (value.length === 1 && +value) {
    output = parameterChanged === 'is_active' ? 'active' : 'private';
    style = {...style,background:'gray'};
	} else if (value.length === 1 && !+value) {
    output = parameterChanged === 'is_active' ? 'deactive' : 'public';
    style = {...style,background:'purple'};
	}else{
    style = {...style,color:'black'}
  }
	return <b style={style}>{output}</b>;
};

export default ValueStyler;
