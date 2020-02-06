import React, { Component } from "react";

import { getChangesHistory } from "../api/api";
import NoChangesComponent from './NoChangesComponent'
import ChangeHistoryList from './ChangeHistoryList'


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
