import React from 'react'
import DateComponent from '../DateComponent'


export default function SliderFooter({currentIndex,numOfAllPics,date}) {   
    return (
        <div id="sliderFooter">
            <div id="slideFooterProfileDetail">
                <DateComponent date={date} />
            </div>
            <div id="sliderCounter">
                <span>{currentIndex + 1} of {numOfAllPics}</span>
            </div>
            <div id="sliderFooterIcons">
                <button><i className="icon trash alternate outline large"></i></button>
            </div>
        </div>
    )
}
