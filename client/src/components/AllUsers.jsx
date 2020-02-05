import React, { Component } from "react";
import { getAllUsersInfo, deleteUser } from "../api/api.js";
import UserInformation from "./UserInformation";
import NoChangesComponent from "./NoChangesComponent";
import Slider from './slider/Slider'
import {profilePicsHistoryOfUser} from '../api/api'

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
        is_private,
        is_active
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
        bio_is_active: 1,
        is_active
      };

      return (
        <div key={index} className="four wide column">
          <UserInformation
            action = "delete"
            userInformation={userInformation}
            buttonFunc={props.deleteOne}
            imageClickedFunc={props.imageClickedFunc}
          />
        </div>
      );
    }
  );

  if (all.length === 0) {
    return <NoChangesComponent section="all_users" />;
  }

  return <div className="ui celled grid">{all}</div>;
};

export default class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = { userData: [], profilePicsHistory:[], showModal:false };
  }

  async componentDidMount() {
    
    const savedUsersInformation = await getAllUsersInfo();

    this.setState({ userData: savedUsersInformation })

  }

  toggleModal = () => {
    this.setState({showModal:!this.state.showModal})
  }

  deleteOne = userId => {
    deleteUser(userId);

    this.setState({
      userData: this.state.userData.filter(user => {
        return user.profile_id !== userId;
      })
    });
  };

  imageClicked = async profile_id => {
    const profilePics = await profilePicsHistoryOfUser(profile_id)
    this.setState({profilePicsHistory: profilePics})
    this.toggleModal()
    
  };

  render() {
    return (
      <div className="ui container">
        <DisplayAllUsers
          allUsers={this.state.userData}
          deleteOne={this.deleteOne}
          imageClickedFunc={this.imageClicked}
        />
        <Slider showModal={this.state.showModal} toggleModal={this.toggleModal} pics={this.state.profilePicsHistory} />
      </div>
    );
  }
}
