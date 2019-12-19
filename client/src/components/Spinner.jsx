import React from 'react'

const Spinner = props => {
    return(
        <div className="ui">
            <div className="ui active inverted dimmer">
                <div className="ui big text loader"></div>
            </div>
            <p></p>
        </div>
    )
}

export default Spinner