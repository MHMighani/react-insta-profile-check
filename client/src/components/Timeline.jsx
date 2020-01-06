import React, { Component } from "react";
import { getUsersChanges, updateUsersChanges } from "../api/api.js";
import Spinner from "./Spinner";
import "./Timeline.css";
import ValueStyler from "./ValueStyler";
import NoChangesComponent from './NoChangesComponent'

const ListOfChanges = props => {
  return props.users.map(({ userId, profile_pic_url, username, changes }) => {
    return (
      <div className="item" key={userId}>
        <img
          className="ui avatar image tiny"
          alt={`${username}'s profile pic`}
          src={profile_pic_url}
        />

        <div className="content">
          <a
            className="header"
            href={`https://instagram.com/${username}/`}
            rel="noreferrer noopener"
            target="_blank"
          >
            {username}
          </a>
          <div className="description">
            {changes.map(
              ({ parameterChanged, newValue, changeText }, index) => {
                return (
                  <div key={index} style={{ marginTop: "1rem" }}>
                    <b>{changeText}</b> is changed.it is now{" "}
                    {ValueStyler(newValue,parameterChanged)}
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



export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = { users_change_information: [], spinnerActive: true };
  }
  async componentDidMount() {
    const users_changes = await getUsersChanges();

    this.setState({ spinnerActive: false });

    this.setState({ users_change_information: users_changes });
  }

  render() {
    if (this.state.spinnerActive) {
      return <Spinner />;
    }
    const users_changes = this.state.users_change_information;
    let message;

    if (users_changes.length === 0) {
      message = <NoChangesComponent section="timeline" />;
    } else {
      message = <ListOfChanges users={users_changes} />;
    }

    if (users_changes.length !== 0) {
      updateUsersChanges(users_changes);
    }

    return (
      <div className="ui list relaxed divided" style={{ margin: "2rem" }}>
        {message}
      </div>
    );
  }
}
