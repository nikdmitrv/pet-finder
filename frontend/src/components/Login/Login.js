import React, { Component } from "react";
import { connect } from "react-redux";

import { requestLoginAC, clearMessageAC } from "../../redux/actions";

class Login extends Component {
  componentDidMount() {
    this.props.clearMessage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user.email && this.props.message === "") {
      window.location = "/account/" + this.props.user._id;
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = JSON.stringify({
      password: event.target.password.value,
      email: event.target.email.value
    });
    this.props.loginUser(user);
  };
  render() {
    return (
      <>
        <div class="reg">
          <div className="form-group row formReg">
            <form onSubmit={this.handleSubmit}>
              <h1><b>Вход в профиль</b></h1>
              <div className="form-group mx-sm-3 mb-2">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  required
                ></input>
              </div>
              <div className="form-group mx-sm-3 mb-2">
                <label>Пароль</label>
                <input
                  className="form-control"
                  name="password"
                  type="password"
                  required
                ></input>
              </div>
              <div className="error-message">{this.props.message}</div>
              <div className="form-group mx-sm-3 mb-2">
                <button className="btn btn-primary mb-2" type="submit">
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    message: store.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: user => dispatch(requestLoginAC(user)),
    clearMessage: () => dispatch(clearMessageAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
