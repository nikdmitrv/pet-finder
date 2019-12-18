import React, { Component } from "react";
import { connect } from "react-redux";

import { requestLoginAC } from "../../redux/actions";

class Login extends Component {
  state = {
    message: ""
  };

  componentDidUpdate(prevProps, prevState) {
    window.location = "/account/" + this.props.user._id;
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
    console.log("Login props:", this.props);

    return (
      <>
       <div class="reg">
        <div className="form-group row formReg">
          <form onSubmit={this.handleSubmit}>
        <h1>Вход в профиль</h1>
          <div className="form-group mx-sm-3 mb-2">
              <label>Email</label>
              <input className="form-control" name="email" type="email" required></input>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>Пароль</label>
              <input className="form-control" name="password" type="password" required></input>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <button className="btn btn-primary mb-2" type="submit">Отправить</button>
            </div>
            <p>{this.state.message}</p>
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
    loginUser: user => dispatch(requestLoginAC(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
