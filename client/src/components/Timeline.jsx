import React, { Component } from 'react'
import {getUsersChanges,updateUsersChanges} from '../api/api.js'
import {Image,List} from 'semantic-ui-react'
import './Timeline.css'

const ListOfChanges = (props) => {
    return(
        props.users.map(user=>{
            return(
                <List>
                    <List.Item>
                        <Image avatar size="tiny" src={user.profile_pic_url} />
                        <List.Content>
                            <List.Header as='a' href={`https://instagram.com/${user.username}/`} target="_blank">{user.username}</List.Header>
                            <List.Description>
                                {
                                    user.changes.map(changeObject=>{
                                        return (
                                            <p>
                                                <b>{changeObject.changeText}</b> is changed.
                                                it is now <b>{changeObject.newValue}</b>
                                            </p>
                                        )
                                        
                                    })
                                }
                                
                            </List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            )
            
        })
    )   
}


function NoChangeComponent() {
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            <div className="ui icon large blue message" style={{marginTop:"2rem",width:"85%"}}>
                <i className="frown outline icon"></i>
                <div className="content">
                    <div className="header">
                        No changes yet
                    </div>
                </div>
            </div>
        </div>
    )
}


export default class Timeline extends Component {
    constructor(props){
        super(props)

        this.state = {users_change_information:[]}
    }
    componentDidMount(){
        getUsersChanges()
        .then(result=>this.setState({users_change_information:result}))
        
    }

    
    render() {
        const users_changes = this.state.users_change_information
        let message

        if(users_changes.length===0){
            message = <NoChangeComponent />
        }else{
            message = <ListOfChanges users = {users_changes} />
        }

        if(users_changes.length!==0){
            updateUsersChanges(users_changes)
        }
        

        return (
            <div>
                {message}
            </div>
        )
    }
}
