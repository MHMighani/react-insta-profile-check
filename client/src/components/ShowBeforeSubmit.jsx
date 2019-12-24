import React, { Component } from 'react'
import UserInformation from './UserInformation';


export default class ShowBeforeSubmit extends Component {
    render() {

        if(typeof(this.props.userInformation)!=="undefined"){
            
            const userInfo = this.props.userInformation
            

            const userObject = {
                profile_pic_url: userInfo.profile_pic_url_hd,
                userName: userInfo.username,
                biography: userInfo.biography,
                fullName: userInfo.full_name,
                is_private: userInfo.is_private,
                profile_id: userInfo.id,
                external_url: userInfo.external_url?userInfo.external_url:"",
                num_following: userInfo.edge_follow,
                num_followers: userInfo.edge_followed_by
            }

            const userInformation = {
                profile_id:userInfo.profile_id,
                username: userInfo.username,
                profile_pic_url: userInfo.profile_pic_url_hd,
                biography: userInfo.biography,
                full_name: userInfo.full_name,
                is_private: userInfo.is_private,
                external_url: userInfo.external_url?userInfo.external_url:"",
                buttonText: {text:"Add User",icon:"icon add",info:userObject},
                bio_is_active: 0
            }

            return (
                <div className="ui cards">
                    <UserInformation userInformation={userInformation} buttonFunc={this.props.addUser} />
                </div>   
            )
        }
    }
}

