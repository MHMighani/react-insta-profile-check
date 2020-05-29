import React from 'react'
import CloseButton from './CloseButton'

const RightArrow = ({rightArrowFunction,closeButtonFunction,toggleModal}) => {
    return (
        <div className="arrow right">
            <CloseButton toggleModal={toggleModal} closeButtonFunction={closeButtonFunction} />
            <button onClick={rightArrowFunction}>
                <i className="icon angle right huge"></i>
            </button>
            
            
        </div>
    )
}

export default RightArrow