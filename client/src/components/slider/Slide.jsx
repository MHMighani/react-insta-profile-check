import React from 'react'

export default function Slide({image}) {
    
    return (
        <div id="slideImage">
            <img src={image} width="500px" height="500px" alt="profile pic"/>
        </div>
    )
}
