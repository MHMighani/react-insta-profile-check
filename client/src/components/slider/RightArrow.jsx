import React from 'react'
import CloseButton from './CloseButton'

export default function RightArrow({rightArrowFunction,closeButtonFunction,toggleModal}) {
    return (
        <div className="arrow right">
            <CloseButton toggleModal={toggleModal} closeButtonFunction={closeButtonFunction} />
            <button onClick={rightArrowFunction}>
                <i className="icon angle right huge"></i>
            </button>
            
            
        </div>
    )
}
