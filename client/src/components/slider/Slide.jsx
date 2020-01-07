import React from 'react'

export default function Slide({image}) {
    
    return (
        <div id="slideImage">
            <img src={image} alt="profile pic"/>
        </div>
    )
}
