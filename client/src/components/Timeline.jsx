import React, { Component } from "react";
import { getUsersChanges, updateUsersChanges } from "../api/api.js";
// import { Image, List } from "semantic-ui-react";
import Spinner from "./Spinner";
import "./Timeline.css";

const ListOfChanges = props => {
  
  return props.users.map(({ userId, profile_pic_url, username, changes }) => {
    return (
      
        <div className="item" key={userId}>
          <img className="ui avatar image tiny" alt={`${username}'s profile pic`} src={profile_pic_url} />
          <div className="content">
            <a className="header"
              href={`https://instagram.com/${username}/`}
              rel="noreferrer noopener"
              target="_blank"
            >
              {username}
            </a>
            <div className="description">
              {changes.map(
                ({ parameterChanged, newValue, changeText }, index) => {
                  if(parameterChanged === "is_private"){
                    
                    newValue = newValue === "1"?"private":"public"
                  }
                  let newValueText = <p></p>;
                  if (parameterChanged !== "profile_pic_url") {
                    newValueText = (
                      <p>
                        it is now <b>{newValue}</b>
                      </p>
                    );
                  }
                  if (newValue === "") {
                    newValueText = (
                      <p>
                        It is now
                        <span
                          style={{
                            background: "lightPink",
                            color: "white",
                            margin: "0 .5rem",
                            padding: "0 .5rem",
                            textDecoration: "italic"
                          }}
                        >
                          Empty
                        </span>
                      </p>
                    );
                  }
                  return (
                    <div key={index} style={{marginTop:"1rem"}}>
                      <b>{changeText}</b> is changed.{newValueText}
                      
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      
    );
  });
};

function NoChangeComponent() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="ui icon large blue message"
        style={{ marginTop: "2rem", width: "85%" }}
      >
        <i className="frown outline icon"></i>
        <div className="content">
          <div className="header">No changes yet</div>
        </div>
      </div>
    </div>
  );
}

export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = { users_change_information: [], spinnerActive: true };
  }
  async componentDidMount() {
    const users_changes = await getUsersChanges();
    
    this.setState({spinnerActive: false})

    this.setState({ users_change_information: users_changes });
  }

  render() {
    if(this.state.spinnerActive){
      return <Spinner />
    }
    const users_changes = this.state.users_change_information;
    let message;

    if (users_changes.length === 0) {
      message = <NoChangeComponent />;
    } else {
      message = <ListOfChanges users={users_changes} />;
    }

    if (users_changes.length !== 0) {
      updateUsersChanges(users_changes);
    }

    return <div className="ui list relaxed divided" style={{margin:"2rem"}}>{message}</div>;
  }
}
