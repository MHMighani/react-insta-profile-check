import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
    return(
        <div className="index-spinner">
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
    )
}

export default Spinner