import React from 'react'
import {getHistoryChangeOfUser} from '../api/api'
import ChangeHistoryList from './ChangeHistoryList'

class ChangeHistoryOfUser extends React.Component{
    state = {changeList:[]}
    async componentDidMount(){
        const changeList = await getHistoryChangeOfUser(this.props.match.params.id)
        this.setState({changeList})
    }
    
    
    render(){
        return (
            <div><ChangeHistoryList changeHistoryArray={this.state.changeList} /></div>
        )
    }
}

export default ChangeHistoryOfUser