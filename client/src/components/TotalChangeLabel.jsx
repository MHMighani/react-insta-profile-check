import React from 'react'
import { Link } from 'react-router-dom';

const TotalChangeLabel = ({totalChange,username}) => {
    let totalChangeLabel = null;
    if(totalChange > 0){
        totalChangeLabel = (
            <div className="floating ui blue label">
                <Link to={`/userChangesHistory/${username}`}>
                    {totalChange}
                </Link>
            </div>
        )
    }

    return totalChangeLabel
}

export default TotalChangeLabel
