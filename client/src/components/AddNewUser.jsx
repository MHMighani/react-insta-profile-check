import React, { useState } from "react";
import { getUserDataFromInstagram as getuser } from "../api/api.js";
import UserInformation from "./UserInformation";
import UserNameNotFound from "./UserNameNotFound";

const AddNewUser = () => {
  const [username,setUsername] = useState('');
  const [info,setInfo] = useState('');
  const [notFoundStatus,setNotFoundStatus] = useState(false);

  console.log(info)

  const getUserData = async username => {
    let userInfo = await getuser(username);

    if (userInfo.error) {
      setNotFoundStatus(true)
      setUsername(username)
      return;
    }

    if (!userInfo.graphql) {
      return;
    } else {
      userInfo = userInfo.graphql;
    }
    if (typeof userInfo.user === "object") {
      userInfo = userInfo.user;
      setInfo({...userInfo,buttonText: { text: "Add User", icon: "icon add" }})
      setNotFoundStatus(false)
    }
  };

    let resultBox ;
    if (notFoundStatus) {
      resultBox = resultBox = (
        <UserNameNotFound username={username} />
      );
    } else {
      resultBox = (
        <div className="ui cards">
          <UserInformation action="add" userInformation={info} />
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
              onChange={event => getUserData(event.target.value)}
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

export default AddNewUser
