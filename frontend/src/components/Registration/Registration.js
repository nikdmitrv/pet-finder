import React, { Component } from "react";
import { connect } from "react-redux";

import { requestRegisterAC } from "../../redux/actions";

class Registration extends Component {
  state = {
    message: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    if (event.target.password.value !== event.target.confirmPassword.value) {
      this.setState({ message: "Пароли не совпадают" });
    } else {
      const user = JSON.stringify({
        name: event.target.name.value,
        password: event.target.password.value,
        email: event.target.email.value
      });
      this.props.registerUser(user);
      window.location = "/";
    }
  };
  render() {
    return (
      <>
        <h1>Форма регистрация</h1>
        <div className="form-group row formReg">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group mx-sm-3 mb-2">
              <label>Имя</label>
              <input className="form-control" name="name" required></input>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>Email</label>
              <input className="form-control" name="email" type="email" required></input>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>Пароль</label>
              <input className="form-control" name="password" type="password" required></input>
            </div>
            <div className="form-group mx-sm-3 mb-2">
              <label>Подтвердите пароль</label>
              <input className="form-control" name="confirmPassword" type="password"></input>
            </div>
            <p>
              <button className="btn btn-primary mb-2" type="submit">Отправить</button>
            </p>
            <p>{this.state.message}</p>
            <p>{this.props.message}</p>
          </form>

        </div>
      </>
    );
  }
}

function mapStateToProps(store) {
  return {
    message: store.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: user => dispatch(requestRegisterAC(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
