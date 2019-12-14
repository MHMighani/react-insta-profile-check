import React, { Component } from 'react'
import {getUserDataFromInstagram as getuser} from '../api/api.js'
import {addNewUserToDatabase as addUser} from '../api/api.js'
import ShowBeforeSubmit from './ShowBeforeSubmit'
import UserNameNotFound from './UserNameNotFound'
import styled from 'styled-components'
import './AddNewUser.css'

// shows success or error message after adding a user
const MessageBox = props => {
    const resultMessage = props.resultMessage
    const type = resultMessage.type
    const username = resultMessage.username
    
    if(type==="success"){
        return(
            <StyledMessageBox type="success">
                {`${username} successfully added !`}
            </StyledMessageBox>
        )
    }else if(type==="error" && resultMessage.errno===1062){
        return(
            <StyledMessageBox type="fail">
                {`Failed to add ${username}.
                This user exists!`}
            </StyledMessageBox>
        )
    }

    return <div></div>
    
    
}

export default class AddNewUser extends Component {
    state = {
        username:"",
        info:"",
        notFoundStatus: false,
        resultMessage:{type:"",errno:null}
    }

    addUserToDatabase = (userData) => {
        const username = userData.userName

        addUser(userData)
        .then(result=>{
            console.log(result)
            if(result.type === "error" && result.errno===1062 ){
                this.setState({resultMessage: {type:"error",username:username,errno:1062}})
            }else if(result.type === "success"){
                this.setState({resultMessage: {type:"success",username:username}})
            }
        })       
    }

    getUserData = async username => {
        let userInfo = await getuser(username)
        
        if(userInfo.error){
            this.setState({notFoundStatus:true,username})
            return
        }

        if(typeof(userInfo.graphql)==="undefined"){
            return
        }else{
            userInfo = userInfo.graphql
        }
        if(typeof(userInfo.user)==="object"){
            userInfo = userInfo.user
            this.setState({info:userInfo,notFoundStatus:false})
        }
    }

    render() {
        
        let resultBox = <div></div>
        if(this.state.notFoundStatus){
            resultBox = resultBox = <UserNameNotFound username={this.state.username} />
        }else{
            resultBox = <ShowBeforeSubmit userInformation={this.state.info} addUser={this.addUserToDatabase} />
        }
 
        return (
                <div className="ui six column centered grid">
                    <MessageBox resultMessage={this.state.resultMessage} />    

                    <div className="four column row">
                        <div className="ui left icon input"
                            style={{marginTop:"1rem"}}
                            >
                            <input type="text" id="newUsernameInput" placeholder="Search user..." 
                            onChange={event => this.getUserData(event.target.value)}
                            style={{border:"1px solid black"}}
                            >
                            </input>
                            <i className="users icon"></i>
                        </div>
                    </div>
                    <div className="six column row">
                        <div className="submitSection">
                            {resultBox}
                        </div>
                    </div>
                </div>
        )
    }
}


const StyledMessageBox = styled.div`
    background: ${props=>props.type==="success"?"green":"red"};
    width:35%;
    margin-top: 2rem;
    padding: 1rem;
    color:white;
`

