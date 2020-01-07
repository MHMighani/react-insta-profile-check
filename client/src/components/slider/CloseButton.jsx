import React from 'react'

export default function closeButton({closeButtonFunction}) {
    return (
        <div id="slider-closeButton">
            <button onClick={closeButtonFunction}>
                <i className="icon close big"></i>
            </button>
            
        </div>
    )
}
