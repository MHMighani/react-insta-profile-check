import React from 'react';
import DateComponent from '../DateComponent';

const SliderFooter = ({ date, currentIndex, numOfAllPics,deleteButtonOnClick}) => {
	return (
		<div id="sliderFooter">
			<div id="slideFooterProfileDetail">
				<DateComponent date={date} />
			</div>
			<div id="sliderCounter">
				<span>
					{currentIndex + 1} of {numOfAllPics}
				</span>
			</div>
			<div id="sliderFooterIcons">
				<button style={{ cursor: 'pointer' }} onClick={() => deleteButtonOnClick()}>
					<i className="icon trash alternate outline large"></i>
				</button>
			</div>
		</div>
	);
};

export default SliderFooter;
