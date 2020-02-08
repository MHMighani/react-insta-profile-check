import React from "react";
import { Link } from "react-router-dom";
import { getHistoryChangeOfUser } from "../api/api";
import ChangeHistoryList from "./ChangeHistoryList";
import Modal from "./Modal";

class ChangeHistoryOfUser extends React.Component {
  state = { changeList: [] };
  async componentDidMount() {
    const changeList = await getHistoryChangeOfUser(this.props.match.params.id);
    this.setState({ changeList });
  }

  renderActions() {
    return (
      <React.Fragment>
        <Link to="/allusers" className="ui button primary">
          ok
        </Link>
      </React.Fragment>
    );
  }

  render() {
    const content = (
      <ChangeHistoryList changeHistoryArray={this.state.changeList} />
    );
    return (
      <Modal
        title={`user's change history`}
        content={content}
        actions={this.renderActions()}
      />
    );
  }
}

export default ChangeHistoryOfUser;
