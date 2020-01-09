import React from 'react'

export default function closeButton({toggleModal}) {
    return (
        <div id="slider-closeButton">
            <button onClick={toggleModal}>
                <i className="icon close big"></i>
            </button>
            
        </div>
    )
}
