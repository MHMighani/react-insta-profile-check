import React, { Component } from "react";
import PicNameExtractor from "./PicNameExtractor";
import { getChangesHistory } from "../api/api";

//this function returns styled values
const valueStyler = value => {
  if (!value) {
    return (
      <b style={{ background: "blue", color: "white", padding: ".2rem .2rem" }}>
        empty
      </b>
    );
  }

  if (value.length === 1 && parseInt(value)) {
    return <b>private</b>
  }else if(value.length===1 && !parseInt(value)){
    return <b>public</b>
  }
  return <b>{value}</b>
};

const ChangeHistoryList = ({ changeHistoryArray }) => {
  const changeHistoryList = changeHistoryArray.map(
    ({
      change_id,
      user_id,
      profile_pic_url,
      changed_parameter,
      username,
      date_modified,
      old_Value,
      new_Value
    }) => {
      let changeText = "";
      if (changed_parameter === "profile_pic_url") {
        const oldPicName = PicNameExtractor(old_Value);
        const newPicName = PicNameExtractor(new_Value);
        const oldValueAddress =
          "http://localhost:4000/static/" + user_id + "/" + oldPicName + ".jpg";
        const newValueAddress =
          "http://localhost:4000/static/" + user_id + "/" + newPicName + ".jpg";

        changeText = (
          <div>
            <div className="item" key={change_id}>
              <div className="content">
                <a
                  href={`https://www.instagram.com/${username}/`}
                  target="_blank"
                  className="header"
                >
                  {username}
                </a>
                <div className="description">
                  profile pic changed from
                  <img
                    className="ui avatar image tiny"
                    src={oldValueAddress}
                    alt="old profile pic"
                  />{" "}
                  to
                  <img
                    className="ui avatar image tiny"
                    src={newValueAddress}
                    alt="new profile pic"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        changeText = (
          <div>
            <div className="item" key={change_id}>
              <img
                src={profile_pic_url}
                alt="profile picture"
                className="ui avatar tiny image"
              />
              <div className="content">
                <a
                  href={`https://www.instagram.com/${username}/`}
                  target="_blank"
                  className="header"
                >
                  {username}
                </a>
                <div className="description">
                  {changed_parameter} changed from {valueStyler(old_Value)} to{" "}
                  {valueStyler(new_Value)}
                </div>
              </div>
            </div>
          </div>
        );
      }
      return <div>{changeText}</div>;
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
