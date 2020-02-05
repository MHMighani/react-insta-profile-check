import React, { Component } from "react";
import PicNameExtractor from "./PicNameExtractor";
import { getChangesHistory } from "../api/api";
import DateComponent from "./DateComponent";
import valueStyler from './ValueStyler'
import NoChangesComponent from './NoChangesComponent'


const ChangeHistoryList = ({ changeHistoryArray }) => {
  const changeHistoryList = changeHistoryArray
    .reverse()
    .map(
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
        if (changed_parameter === "is_private") {
          changed_parameter = "privacy status";
        }
        let changeText = "";
        if (changed_parameter === "profile_pic_url") {
          const oldPicName = PicNameExtractor(old_Value);
          const newPicName = PicNameExtractor(new_Value);
          const oldValueAddress =
            "http://localhost:4000/static/" +
            user_id +
            "/" +
            oldPicName +
            ".jpg";
          const newValueAddress =
            "http://localhost:4000/static/" +
            user_id +
            "/" +
            newPicName +
            ".jpg";

          changeText = (
            <React.Fragment>
              <div className="content">
              <div className="header">
                <a
                  href={`https://www.instagram.com/${username}/`}
                  rel="noopener noreferrer"
                  target="_blank"
                  
                >
                  {username} 
                </a>
                <DateComponent date={date_modified} />
                </div>
                <div className="description">
                  profile pic changed from
                  <img
                    className="ui avatar image tiny"
                    src={oldValueAddress}
                    alt="old profile pic"
                    style={{margin:"0 1rem"}}
                  />{" "}
                  to
                  <img
                    className="ui avatar image tiny"
                    src={newValueAddress}
                    alt="new profile pic"
                    style={{margin:"0 1rem"}}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        } else {
          changeText = (
            <React.Fragment>
              <img
                src={profile_pic_url}
                alt={`${username} profile pic`}
                className="ui avatar tiny image"
              />

              <div className="content">
                <div className="header">
                <a
                  href={`https://www.instagram.com/${username}/`}
                  rel="noopener noreferrer"
                  target="_blank"
                  
                >
                  {username} 
                </a>
                <DateComponent date={date_modified} />
                </div>
                

                <div className="description" style={{ marginTop: ".5rem" }}>
                  {changed_parameter} changed from {valueStyler(old_Value,changed_parameter)} to{" "}
                  {valueStyler(new_Value,changed_parameter)}
                </div>
              </div>
            </React.Fragment>
          );
        }
        return (
          <div className="item" key={change_id} style={{ margin: "1rem 0" }}>
            {changeText}
          </div>
        );
      }
    );
  return (
    <div className="ui relaxed divided list" style={{ margin: "1rem 3rem" }}>
      {changeHistoryList}
    </div>
  );
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
      <NoChangesComponent section="changes" />
    );
  }
}

export default ChangesHistory;
