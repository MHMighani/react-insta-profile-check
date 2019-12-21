import React, { Component } from 'react'

import { getChangesHistory} from '../api/api'



const ChangeHistoryList = ({ changeHistoryArray }) => {
    const changeHistoryList = changeHistoryArray.map(change => {
        return (
            <div className="item" key={change.change_id}>
                
                <div className="content">
                    <a href="#" className="header">User name</a>
                    <div className="description">{change.changed_parameter} changed from {change.old_Value} to {change.new_Value} in {change.date_modified}</div>
                </div>
            </div>
        )
    })

    return <div className="ui list">{changeHistoryList}</div>
}

class ChangesHistory extends Component {
    constructor(props){
        super(props)

        this.state = { changesHistory: [] }
    }

    async componentDidMount() {
        const changesHistoryList = await getChangesHistory()
        this.setState({ changesHistory: changesHistoryList })
    }

    render() {
        const changeHistoryLength = this.state.changesHistory.length
        
        if(changeHistoryLength>0){
            return <ChangeHistoryList changeHistoryArray = {this.state.changesHistory} />
        }

        return (
            <div className="container">
                <div className="ui icon large blue message" style={{ marginTop: "2rem" }}>
                    <i className="info icon"></i>
                    <div className="content">
                        <div className="header">No change Recorded yet!</div>
                    </div>
                </div>
            </div>
            
        )
        
    }
}

export default ChangesHistory