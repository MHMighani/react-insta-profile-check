import React, { Component } from 'react'
import {getUsersChanges,updateUsersChanges} from '../api/api.js'
import {Image,List} from 'semantic-ui-react'
import './Timeline.css'

const ListOfChanges = (props) => {
    return(
        props.users.map(({userId,profile_pic_url,username,changes})=>{

            return(
                <List className="ui list" key={userId}>
                    <List.Item>
                        <Image avatar size="tiny" src={profile_pic_url} />
                        <List.Content>
                            <List.Header as='a' href={`https://instagram.com/${username}/`} target="_blank">{username}</List.Header>
                            <List.Description>
                                {
                                    changes.map((changeObject,index)=>{
                                        return (
                                            <p key={index}>
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
    async componentDidMount(){
        const users_changes = await getUsersChanges()

        this.setState({users_change_information:users_changes})
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
