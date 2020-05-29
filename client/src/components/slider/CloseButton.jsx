import React from 'react'

const CloseButton = ({toggleModal}) => {
    return (
        <div id="slider-closeButton">
            <button onClick={toggleModal}>
                <i className="icon close big"></i>
            </button>
            
        </div>
    )
}

export default CloseButton
