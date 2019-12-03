import React, { Component } from 'react'
import {getAllUsersInfo,deleteUser} from '../api/api.js'
import UserInformation from './UserInformation'

const DisplayAllUsers = props => {    
    const all = props.allUsers.map((user,index)=>{
        //checking if user has Name or not
        if(user.full_name === ""){
            user.full_name = <div className="meta" style={{color:"red"}}>No Name</div>
        }else{
            user.full_name = <div className="meta">{user.full_name}</div>
        }

        
        const userInformation = {
            profile_id:user.profile_id,
            username: user.username,
            profile_pic_url: user.profile_pic_url,
            biography: user.biography,
            full_name: user.full_name,
            is_private: user.is_private,
            buttonText:{text:"Delete",icon:"delete icon",info:user.profile_id},
            bio_is_active: 1
        }

        return(
            <div  key={index} className="four wide column">
                <UserInformation userInformation = {userInformation} buttonFunc = {props.deleteOne}/>
            </div>
        )
    })
    
    if(all.length===0){
        return (
            <div className="ui icon large blue message" style={{marginTop:"2rem"}}>
                <i className="info icon"></i>
                <div className="content">
                    <div className="header">
                        No User is added yet! 
                    </div>
                </div>
            </div>
        )
    }
    
    return <div className="ui celled grid">{all}</div>
}

export default class AllUsers extends Component {
    constructor(props){
        super(props)

        this.state = {userData:[]}
    }

    componentDidMount(){        
        getAllUsersInfo()
        .then((result)=>{
            this.setState({userData:result.data})
        })
    }

    deleteOne = (userId) => {
        deleteUser(userId)

        this.setState({
            userData: this.state.userData.filter((user)=>{
                return user.profile_id !== userId
            })
        })
    }
    render() {
        return (
            <div className="ui container">
                <DisplayAllUsers allUsers={this.state.userData} deleteOne={this.deleteOne} />
            </div>
        )
    }
}



