import React from 'react'

const ChangeParameterText = ({changedParameter}) => {
    let changedParameterText
    switch (changedParameter) {
        case 'is_private':
            changedParameterText = 'privacy status';
            break;
        case 'is_active':
            changedParameterText = 'activation status';
            break;
        case 'external_url':
            changedParameterText = 'external link';
            break;
        case 'full_name':
            changedParameterText = 'full name';
            break;
        default:
            changedParameterText = changedParameter
            break;
    }

    return <b>{changedParameterText}</b>
}

export default ChangeParameterText