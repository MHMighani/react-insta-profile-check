import React from 'react';

const LeftArrow = ({ leftArrowFunction }) => {
	return (
		<div className="arrow left">
			<button onClick={leftArrowFunction}>
				<i className="icon angle left huge"></i>
			</button>
		</div>
	);
};

export default LeftArrow;
