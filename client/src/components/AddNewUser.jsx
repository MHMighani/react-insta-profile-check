import React, { Component } from "react";
import { getUserDataFromInstagram as getuser } from "../api/api.js";
import UserInformation from "./UserInformation";
import UserNameNotFound from "./UserNameNotFound";
import styled from "styled-components";

export default class AddNewUser extends Component {
  state = {
    username: "",
    info: "",
    notFoundStatus: false,
    resultMessage: { type: "", errno: null }
  };

  getUserData = async username => {
    let userInfo = await getuser(username);

    if (userInfo.error) {
      this.setState({ notFoundStatus: true, username });
      return;
    }

    if (typeof userInfo.graphql === "undefined") {
      return;
    } else {
      userInfo = userInfo.graphql;
    }
    if (typeof userInfo.user === "object") {
      userInfo = userInfo.user;
      this.setState({
        info: {
          ...userInfo,
          buttonText: { text: "Add User", icon: "icon add" }
        },
        notFoundStatus: false
      });
    }
  };

  render() {
    let resultBox = <div></div>;
    if (this.state.notFoundStatus) {
      resultBox = resultBox = (
        <UserNameNotFound username={this.state.username} />
      );
    } else {
      resultBox = (
        <div className="ui cards">
          <UserInformation action="add" userInformation={this.state.info} />
        </div>
      );
    }

    return (
      <div className="ui six column centered grid">
        <div className="four column row">
          <div className="ui left icon input" style={{ marginTop: "1rem" }}>
            <input
              type="text"
              id="newUsernameInput"
              placeholder="Search user..."
              onChange={event => this.getUserData(event.target.value)}
              style={{ border: "1px solid black" }}
              autoComplete="off"
            ></input>
            <i className="users icon"></i>
          </div>
        </div>
        <div className="six column row">
          <div className="submitSection">{resultBox}</div>
        </div>
      </div>
    );
  }
}

const StyledMessageBox = styled.div`
  background: ${props => (props.type === "success" ? "green" : "red")};
  width: 35%;
  margin-top: 2rem;
  padding: 1rem;
  color: white;
`;
