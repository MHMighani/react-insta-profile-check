import React, { Component } from 'react'
import {getUserDataFromInstagram as getuser} from '../api/api.js'
import {addNewUserToDatabase as addUser} from '../api/api.js'
import ShowBeforeSubmit from './ShowBeforeSubmit'
import './AddNewUser.css'

export default class AddNewUser extends Component {
    state = {
        username:"",
        info:""
    }


    addUserToDatabase = (userData) => {
        addUser(userData)        
    }

    render() {
        const getUserData = (username) => {
            getuser(username)
                .then(result=>{
                    if(typeof(result.graphql)==="undefined"){
                        return
                    }else{
                        result = result.graphql
                    }
                    if(typeof(result.user)==="object"){
                        result = result.user
                        this.setState({info:result})
                    }
                })
        }
 
        return (
                <div className="ui six column centered grid">
                    
                    <div className="four column row">
                        <div className="ui left icon input">
                        <input type="text" id="newUsernameInput" placeholder="Search user..." onChange={event => getUserData(event.target.value)} ></input>
                        <i className="users icon"></i>
                        </div>
                    </div>
                    <div className="six column row">
                        <div className="submitSection">
                            <ShowBeforeSubmit userInformation={this.state.info} addUser={this.addUserToDatabase} />
                        </div>
                    </div>
                </div>
                
            
            

        )
    }
}

