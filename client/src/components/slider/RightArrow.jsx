import React from 'react'
import CloseButton from './CloseButton'

export default function RightArrow({rightArrowFunction,closeButtonFunction}) {
    return (
        <div className="arrow right">
            <CloseButton closeButtonFunction={closeButtonFunction} />
            <button onClick={rightArrowFunction}>
                <i className="icon angle right huge"></i>
            </button>
            
            
        </div>
    )
}
