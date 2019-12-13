import React, { Component } from "react";
import { connect } from "react-redux";
import { createFoundAdvertAC } from "../../redux/actions";

class FoundForm extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const {
      dogBreed,
      dogDescription,
      dogSex,
      authorName,
      authorEmail,
      authorPhoneNumber,
      authorAddress
    } = event.target;

    const advert = JSON.stringify({
      dogData: {
        breed: dogBreed.value,
        description: dogDescription.value,
        sex: dogSex.value
      },
      authorData: {
        name: authorName.value,
        email: authorEmail.value,
        phoneNumber: authorPhoneNumber.value,
        adress: authorAddress.value
      },
      createdAt: Date.now()
    });

    this.props.createFoundAdvert(advert);
  };

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="dog-breed">Порода:</label>
          <input
            onChange={this.handleInput}
            name="dogBreed"
            id="dog-breed"
            type="text"
          />

          <label htmlFor="dog-description">Описание:</label>
          <input
            onChange={this.handleInput}
            name="dogDescription"
            id="dog-description"
            type="text"
          />

          <label htmlFor="dog-sex">Пол:</label>
          <input onChange={this.handleInput} name="dogSex" id="dog-sex" />

          <label htmlFor="author-name">Имя:</label>
          <input
            onChange={this.handleInput}
            name="authorName"
            id="author-name"
          />

          <label htmlFor="author-email">Email:</label>
          <input
            onChange={this.handleInput}
            name="authorEmail"
            id="author-email"
          />

          <label htmlFor="author-phoneNumber">Телефонный номер:</label>
          <input
            onChange={this.handleInput}
            name="authorPhoneNumber"
            id="author-phoneNumber"
          />

          <label htmlFor="author-address">Адрес:</label>
          <input
            onChange={this.handleInput}
            name="authorAddress"
            id="author-address"
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    message: store.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createFoundAdvert: advert => dispatch(createFoundAdvertAC(advert))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundForm);
