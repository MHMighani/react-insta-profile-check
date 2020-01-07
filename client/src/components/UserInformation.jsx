import React, { Component } from "react";
import Privacy from "./Privacy";
import Biography from "./Biography";

export default class UserInformation extends Component {  
  

  render() {

    const {
      profile_id,  
      username,
      profile_pic_url,
      full_name,
      biography,
      buttonText,
      is_private,
      external_url,
      bio_is_active
    } = this.props.userInformation;

    const info = buttonText.info;

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

          <div
            onClick={() => this.props.buttonFunc(info)}
            className="ui bottom attached button"
          >
            <i className={buttonText.icon}></i>
            {buttonText.text}
          </div>
        </div>
      );
    }
  }
}
