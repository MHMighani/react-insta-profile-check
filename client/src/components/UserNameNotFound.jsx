import React from 'react'

const UserNameNotFound = props => {
    const username = props.username
    return(
        <div className="ui placeholder segment container">
            <div className="ui icon large header">
                    <i className="times circle outline icon"></i>
            </div>
            <div><b>{username}</b> user is not found</div>
        </div>
    )
}

export default UserNameNotFound