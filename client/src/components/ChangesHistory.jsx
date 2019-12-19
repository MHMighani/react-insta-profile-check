import React from 'react'

import { getChangesHistory } from '../api/api'

const ChangesHistory = () => {
    getChangesHistory()
    return(
        <div>Change history</div>
    )
}

export default ChangesHistory