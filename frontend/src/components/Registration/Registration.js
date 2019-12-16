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
        <div>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label>Имя</label>
              <input name="name" required></input>
            </p>
            <p>
              <label>Email</label>
              <input name="email" type="email" required></input>
            </p>
            <p>
              <label>Пароль</label>
              <input name="password" type="password" required></input>
            </p>
            <p>
              <label>Подтвердите пароль</label>
              <input name="confirmPassword" type="password"></input>
            </p>
            <p>
              <button type="submit">Отправить</button>
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
