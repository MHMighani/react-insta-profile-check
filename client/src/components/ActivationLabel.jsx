import React from 'react'

const ActivationLabel = ({isActive}) => {
    let activationLabel = null;
    
    if(isActive === 0){
        activationLabel = <label className="ui red ribbon label">Not Active</label>
    }

    return activationLabel
}

export default ActivationLabel