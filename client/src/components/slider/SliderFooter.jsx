import React from 'react'


export default function SliderFooter({currentIndex,numOfAllPics}) {
    return (
        <div id="sliderFooter">
            {currentIndex + 1} of {numOfAllPics}
        </div>
    )
}
