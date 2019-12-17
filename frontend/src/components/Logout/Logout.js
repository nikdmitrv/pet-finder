import React, { Component } from "react";
import { connect } from "react-redux";

import { requestLogoutAC } from "../../redux/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.requestLogout();
    window.location = "/";
  }

  render() {
    return <div>Logging out...</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogout: () => dispatch(requestLogoutAC())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
