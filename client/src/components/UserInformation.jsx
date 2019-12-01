import React, { Component } from 'react'
import Privacy from './Privacy'
import Biography from './Biography'

export default class UserInformation extends Component {
    render() {
        const {
            
            username,
            profile_pic_url,
            full_name,
            biography,
            buttonText,
            is_private,
            bio_is_active
        } = this.props.userInformation

        const info = buttonText.info
        
        if(typeof(username)==="undefined"){
            return <div></div>
        }else{
            return (
                <div className="ui card">
                    <div className="image small">
                        <img src={profile_pic_url} alt="profile pic"/>
                    </div>
                    <div className="content">
                        <div className="header"><a href={`https://www.instagram.com/${username}/`} target="_blank" rel="noopener noreferrer" >{username}</a></div>
                        {full_name}
                        <div className="discription">
                            <Biography biographyText={biography} isActive={bio_is_active} />
                        </div>
                        
                        <Privacy is_private={is_private} />
                    </div>
                    
                    <div onClick={()=>this.props.buttonFunc(info)} className="ui bottom attached button">
                    <i className={buttonText.icon}></i>{buttonText.text}</div>
                </div>
        )
        }
        
    }
}
