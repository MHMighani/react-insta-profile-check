import React from 'react'

const Slide = ({image}) => {
    const imageAddress = `http://localhost:4000/static/` + image

    return (
        <div id="slideImage">
            <img src={imageAddress} width="500px" height="500px" alt="profile pic"/>
        </div>
    )
}

export default Slide