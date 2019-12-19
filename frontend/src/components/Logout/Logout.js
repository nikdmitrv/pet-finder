import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from "../Loading/Loading";
import { requestLogoutAC } from "../../redux/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.requestLogout();
    window.location = "/";
  }

  render() {
    return (
      <div className="loading-block">
        <Loading />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogout: () => dispatch(requestLogoutAC())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
