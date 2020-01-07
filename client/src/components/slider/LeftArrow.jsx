import React from 'react'

export default function LeftArrow({leftArrowFunction}) {
    // console.log(LeftArrowFunction)
    return (
        <div className="arrow left">
            <button onClick={leftArrowFunction}>
                <i className="icon angle left huge"></i>
            </button>
            
        </div>
    )
}
