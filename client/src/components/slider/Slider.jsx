import React, { useEffect, useState } from 'react';
import Slide from './Slide';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import SliderFooter from './SliderFooter';
import picNameExtractor from '../PicNameExtractor';
import { deleteUserPicture } from '../../api/api';

import './slider_style.css';

const Slider = (props) => {
	const { pics, toggleModal } = props;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const checkKey = (e) => {
		e = e || window.event;

		if (e.keyCode === 39) {
			goToNext();
		} else if (e.keyCode === 37) {
			goToPrevious();
		} else if (e.keyCode === 27) {
			toggleModal();
		}
	};

	document.onkeydown = checkKey;

	useEffect(() => {
		if (showModal !== props.showModal) {
			setShowModal(props.showModal);
			setCurrentImageIndex(0);
		}
		return () => {
			setCurrentImageIndex(0)
		}
	}, [props.showModal]);

	const deleteButtonOnClick = () => {
		if (pics.length > 0) {
			const user_id = pics[currentImageIndex].profile_id;
			const currentImageName = `${picNameExtractor(pics[currentImageIndex].profile_pic_name)}.jpg`;
			const currentImageHistoryId = pics[currentImageIndex].id;

			deleteUserPicture(user_id, currentImageName, currentImageHistoryId);
		}
	};

	const getCurrentImageDate = () => {
		let currentImageDate = pics.length > 0 ? pics[currentImageIndex].pic_date : '';

		return currentImageDate;
	};

	const getCurrentImage = () => {
		const currentPic = pics[currentImageIndex];

		let currentImage =
			pics.length > 0 ? `${currentPic.profile_id}/${picNameExtractor(currentPic.profile_pic_name)}.jpg` : '';

		return currentImage;
	};

	const goToPrevious = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1);
		} else if (currentImageIndex === 0) {
			setCurrentImageIndex(pics.length - 1);
		}
	};

	const goToNext = () => {
		if (currentImageIndex !== pics.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1);
		} else if (currentImageIndex === pics.length - 1) {
			setCurrentImageIndex(0);
		}
	};

	const modalShowClass = () => {
		let modalShowClass = showModal ? 'modal-display-block' : 'modal-display-none';

		return modalShowClass;
	};

	return (
		<div className={modalShowClass()}>
			<div id="slider">
				<div id="mainSlider">
					<LeftArrow leftArrowFunction={goToPrevious} />
					<Slide image={getCurrentImage()} />
					<RightArrow
						toggleModal={toggleModal}
						rightArrowFunction={goToNext}
					/>
				</div>
				<SliderFooter
					deleteButtonOnClick={() => deleteButtonOnClick()}
					currentIndex={currentImageIndex}
					numOfAllPics={pics.length}
					date={getCurrentImageDate()}
				/>
			</div>
		</div>
	);
};

export default Slider;
