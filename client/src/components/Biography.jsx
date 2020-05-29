import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

const Biography = ({ isActive, biographyText }) => {
	const [activeIndex, setActiveIndex] = useState(isActive);

	const handleClick = ({index}) => {
		const newIndex = activeIndex === index ? -1 : index;

		setActiveIndex(newIndex);
	};

	if (biographyText === '') {
		return (
			<p
				style={{
					textDecoration: 'line-through',
				}}
			>
				Biography
			</p>
		);
	}

	return (
		<Accordion>
			<Accordion.Title active={!activeIndex} index={0} onClick={handleClick}>
				<Icon name="dropdown" />
				Biography
			</Accordion.Title>
			<Accordion.Content active={!activeIndex}>{biographyText}</Accordion.Content>
		</Accordion>
	);
};

export default Biography;
