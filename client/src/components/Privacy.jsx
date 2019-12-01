import React from 'react'

export default function Privacy(props) {
    let privacyLabel = ""
    
    if(props.is_private){
        privacyLabel = <div className="ui red medium circular label"><i className="icon lock"></i>Locked</div>
    }else{
        privacyLabel = <div className="ui green medium circular label"><i className="icon lock open"></i>Open</div>
    }

    return(
        <div className="privacySection">
            {privacyLabel}
        </div>
    )
}
