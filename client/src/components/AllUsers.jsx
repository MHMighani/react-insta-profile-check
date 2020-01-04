import React, { Component } from "react";
import { getAllUsersInfo, deleteUser } from "../api/api.js";
import UserInformation from "./UserInformation";
import NoChangesComponent from './NoChangesComponent'

const DisplayAllUsers = props => {
  const all = props.allUsers.map(
    (
      {
        full_name,
        profile_id,
        username,
        profile_pic_url,
        biography,
        external_url,
        is_private
      },
      index
    ) => {
      //checking if user has Name or not
      if (full_name === "") {
        full_name = (
          <div className="meta" style={{ color: "red" }}>
            No Name
          </div>
        );
      } else {
        full_name = <div className="meta">{full_name}</div>;
      }

      const userInformation = {
        profile_id,
        username,
        profile_pic_url,
        biography,
        full_name,
        external_url,
        is_private,
        buttonText: {
          text: "Delete",
          icon: "delete icon",
          info: profile_id
        },
        bio_is_active: 1
      };

      return (
        <div key={index} className="four wide column">
          <UserInformation
            userInformation={userInformation}
            buttonFunc={props.deleteOne}
          />
        </div>
      );
    }
  );

  if (all.length === 0) {
    return (
      <NoChangesComponent section="all_users" />
    );
  }

  return <div className="ui celled grid">{all}</div>;
};

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = { userData: [] };
  }

  async componentDidMount() {
    const savedUsersInformation = await getAllUsersInfo();

    this.setState({ userData: savedUsersInformation });
  }

  deleteOne = userId => {
    deleteUser(userId);

    this.setState({
      userData: this.state.userData.filter(user => {
        return user.profile_id !== userId;
      })
    });
  };
  render() {
    return (
      <div className="ui container">
        <DisplayAllUsers
          allUsers={this.state.userData}
          deleteOne={this.deleteOne}
        />
      </div>
    );
  }
}
