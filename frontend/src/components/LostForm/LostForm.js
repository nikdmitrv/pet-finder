import React, { Component } from "react";
import { connect } from "react-redux";

import { createLostAdvertAC } from "../../redux/actions";
import Maps from "../Maps/Maps";

class LostForm extends Component {
  handleImageUpload = event => {
    event.preventDefault();
    const imgData = new FormData()
    imgData.append('file', event.target.imgInput.files[0])
    this.setState({ imgData })
  }
  handleSubmit = event => {
    event.preventDefault();

    const {
      dogBreed,
      dogDescription,
      dogSex,
      authorName,
      authorEmail,
      authorPhoneNumber,
      authorAddress,
      locationLat,
      locationLng
    } = event.target;

    const request = {
      method: 'POST',
      body: this.state.imgData,
    }

    if (this.state.imgData) {
      fetch('/api/images/', request)
        .then(response => response.json())
        .then(
          data => {
            console.log(data)
            const advert = JSON.stringify({
              dogData: {
                breed: dogBreed.value,
                description: dogDescription.value,
                sex: dogSex.value,
                image: data.filename
              },
              authorData: {
                name: authorName.value,
                email: authorEmail.value,
                phoneNumber: authorPhoneNumber.value,
                adress: authorAddress.value
              },
              location: { lat: locationLat.value, lng: locationLng.value }
            });
            this.props.createLostAdvert(advert)
          })
    } else {
      const advert = JSON.stringify({
        dogData: {
          breed: dogBreed.value,
          description: dogDescription.value,
          sex: dogSex.value,
          image: 'placeholder.jpg'
        },
        authorData: {
          name: authorName.value,
          email: authorEmail.value,
          phoneNumber: authorPhoneNumber.value,
          adress: authorAddress.value
        },
        location: { lat: locationLat.value, lng: locationLng.value }
      });
      this.props.createLostAdvert(advert)
    }

  };

  getLocation = location => {
    document.getElementById("location-input-lat").value = location.lat;
    document.getElementById("location-input-lng").value = location.lng;
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
            required
          />

          <label htmlFor="dog-description">Описание:</label>
          <input
            onChange={this.handleInput}
            name="dogDescription"
            id="dog-description"
            type="text"
            required
          />

          <label htmlFor="dog-sex">Пол:</label>
          <input
            onChange={this.handleInput}
            name="dogSex"
            id="dog-sex"
            required
          />

          <label htmlFor="author-name">Имя:</label>
          <input
            onChange={this.handleInput}
            name="authorName"
            id="author-name"
            required
          />

          <label htmlFor="author-email">Email:</label>
          <input
            onChange={this.handleInput}
            name="authorEmail"
            id="author-email"
            required
          />

          <label htmlFor="author-phoneNumber">Телефонный номер:</label>
          <input
            onChange={this.handleInput}
            name="authorPhoneNumber"
            id="author-phoneNumber"
            required
          />

          <label htmlFor="author-address">Адрес:</label>
          <input
            onChange={this.handleInput}
            name="authorAddress"
            id="author-address"
            required
          />
          <label htmlFor="date-lost">Дата пропажи: </label>
          <input
            type="date"
            name="date"
            id="date-lost"
          />

          <input
            id="location-input-lat"
            name="locationLat"
            hidden
            required
          ></input>
          <input id="location-input-lng" name="locationLng" hidden></input>

          <button>Отправить</button>
        </form>
        <form onSubmit={this.handleImageUpload}>
          <input type='file' name='imgInput' />
          <button>Добавить картинку</button>
        </form>
        <Maps getLocation={this.getLocation} />
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
    createLostAdvert: advert => dispatch(createLostAdvertAC(advert))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LostForm);
