import React from 'react';

const Privacy = ({ is_private }) => {
	let privacyLabel = (
		<div className={`ui ${is_private ? 'red' : 'green'} medium circular label`}>
			<i className={`icon lock ${is_private ? '' : 'open'}`}></i>
			{is_private ? 'locked' : 'open'}
		</div>
	);
	return <div className="privacySection">{privacyLabel}</div>;
};

export default Privacy;
