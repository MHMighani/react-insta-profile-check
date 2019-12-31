import React, { Component } from "react";

import { getChangesHistory } from "../api/api";

//this function returns styled values
const valueStyler = value => {
  if (value) {
    return <b>{value}</b>;
  } else {
    return <b style={{background:"blue",color:"white",padding:".2rem .2rem"}}>empty</b>;
  }
};

const ChangeHistoryList = ({ changeHistoryArray }) => {
  const changeHistoryList = changeHistoryArray.map(
    ({
      change_id,
      profile_pic_url,
      changed_parameter,
      username,
      date_modified,
      old_Value,
      new_Value
    }) => {
        let changeText = ""
        if(changed_parameter === "profile_pic_url"){
            changeText = <div><b>Profile pic</b> changed in {date_modified}</div>
        }else{
            changeText = <div><b>{changed_parameter}</b> changed from {valueStyler(old_Value)} to{" "}
            {valueStyler(new_Value)} in {date_modified}</div>
        }
      return (
        <div className="item" key={change_id}>
          <img
            alt={username}
            className="ui avatar tiny image"
            src={profile_pic_url}
          ></img>
          <div className="content">
            <a
              href={`https://www.instagram.com/${username}/`}
              target="_blank"
              className="header"
            >
              {username}
            </a>
            <div className="description">
              {changeText}
            </div>
          </div>
        </div>
      );
    }
  );

  return <div className="ui list">{changeHistoryList}</div>;
};

class ChangesHistory extends Component {
  constructor(props) {
    super(props);

    this.state = { changesHistory: [] };
  }

  async componentDidMount() {
    const changesHistoryList = await getChangesHistory();
    this.setState({ changesHistory: changesHistoryList });
  }

  render() {
    const changeHistoryLength = this.state.changesHistory.length;

    if (changeHistoryLength > 0) {
      return (
        <ChangeHistoryList changeHistoryArray={this.state.changesHistory} />
      );
    }

    return (
      <div className="container">
        <div
          className="ui icon large blue message"
          style={{ marginTop: "2rem" }}
        >
          <i className="info icon"></i>
          <div className="content">
            <div className="header">No change Recorded yet!</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangesHistory;
