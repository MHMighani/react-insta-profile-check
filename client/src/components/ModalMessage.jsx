import React from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import history from "../history";
import { deleteUser } from "../api/api";
import { addNewUserToDatabase as addUser } from "../api/api";

class ModalMessage extends React.Component {
  actionButton() {
    const { action, id, username } = this.props.match.params;

    if (action === "delete") {
      deleteUser(id);
      history.push("/allusers");
    } else if (action === "add") {
      addUser(username);
      history.push("/add");
    }
  }

  renderActions() {
    const {action} = this.props.match.params
    return (
      <React.Fragment>
        <Link
          to={action === "delete" ? "/allusers" : "/add"}
          className="ui button"
        >
          cancel
        </Link>
        <button
          className="ui button negative"
          onClick={() => this.actionButton()}
        >
          {this.props.match.params.action}
        </button>
      </React.Fragment>
    );
  }

  renderContent(action, username) {
    if (action === "add") {
      return `are you sure you want to Add ${username} ?`;
    } else if (action === "delete") {
      return `are you sure you want to delete ${username}?`;
    }
    return "are you sure you want to do this?";
  }

  renderTitle(action) {
    if (action === "add") {
      return "Add user";
    } else if (action === "delete") {
      return "Delete user";
    }
    return "are you sure?";
  }
  render() {
    const { action, username, id } = this.props.match.params;

    return (
      <Modal
        title={this.renderTitle(action)}
        content={this.renderContent(action, username)}
        actions={this.renderActions()}
        onDismiss={() => history.push("/allusers")}
      />
    );
  }
}

export default ModalMessage;
