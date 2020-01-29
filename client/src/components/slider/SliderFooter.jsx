import React from 'react'


export default function SliderFooter({currentIndex,numOfAllPics}) {    
    return (
        <div id="sliderFooter">
            <div id="slideFooterProfileDetail">
                
            </div>
            <div id="sliderCounter">
                <span>{currentIndex + 1} of {numOfAllPics}</span>
            </div>
            <div id="sliderFooterIcons">
                <button><i className="icon trash alternate outline large"></i></button>
                <button><i className="icon save outline large"></i></button>
            </div>
        </div>
    )
}
