import React, { Component } from "react";

import Privacy from "./Privacy";
import Biography from "./Biography";
import {Link} from 'react-router-dom'

export default class UserInformation extends Component {  
  render() {
    const action = this.props.action

    const {
      profile_id,  
      username,
      profile_pic_url,
      full_name,
      biography,
      buttonText,
      is_private,
      external_url,
      bio_is_active,
      is_active,
      total_change
    } = this.props.userInformation;

    var external_url_tag = (
      <p style={{ color: "lightGrey", textDecoration: "italic" }}>
        No external link
      </p>
    );

    if (external_url) {
      external_url_tag = (
        <a rel="noopener noreferrer" href={external_url} target="_blank">
          {external_url}
        </a>
      );
    }

    if (typeof username === "undefined") {
      return <div></div>;
    } else {
      return (
        <div className="ui card">
            <div className="image small" onClick={()=>this.props.imageClickedFunc(profile_id)} style={{cursor:'pointer'}}>
              {
                is_active===0 &&
                <label className="ui red ribbon label">Not Active</label>
              }
              {
                total_change>0 &&
                <div className="floating ui blue label">
                  <Link to={`/userChangesHistory/${profile_id}`}>{total_change}</Link>
                </div>
              }
              

              <img src={profile_pic_url} alt="profile pic" />
            </div>

          <div className="content">
            <div className="header">
              
              <a
                href={`https://www.instagram.com/${username}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {username}
              </a>
            </div>
            {full_name}
            <div className="discription">
              <Biography biographyText={biography} isActive={bio_is_active} />
              {external_url_tag}
            </div>

            <Privacy is_private={is_private} />
          </div>

          <Link to={`/modalMessage/${action}/${username}/${profile_id}`} className="ui bottom attached button">
            <i className={buttonText.icon}></i>
            {buttonText.text}
          </Link>
        </div>
      );
    }
  }
}
