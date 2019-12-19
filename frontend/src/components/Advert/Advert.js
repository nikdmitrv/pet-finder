import React, { Component } from "react";
import { connect } from "react-redux";

import AdvertMap from "./AdvertMap";

class Advert extends Component {
  state = {};

  componentDidMount() {
    !this.state.advertData && this.fetchAdvertData();
  }

  fetchAdvertData = () => {
    fetch(`/api/${this.props.advertType}/` + this.props.match.params.id)
      .then(response => response.json())
      .then(data => this.setState({ advertData: data }));
  };

  render() {
    console.log(this.state);

    return this.state.advertData ? (
      <div>
        <div>Собака потеряна:</div>
        <div>{this.state.advertData.dogData.breed}</div>
        <div>{this.state.advertData.dogData.description}</div>
        <div>{this.state.advertData.dogData.sex}</div>
        <div>Хозяин:</div>
        <div>{this.state.advertData.authorData.name}</div>
        <div>{this.state.advertData.authorData.email}</div>
        <div>{this.state.advertData.authorData.phoneNumber}</div>
        <div>{this.state.advertData.authorData.address}</div>
        <div>Дата объявления:</div>
        <div>
          {new Date(this.state.advertData.createdAt).toLocaleDateString("ru")}
        </div>
        <img alt="dog"
          src={
            "http://localhost:5000/api/images/" +
            this.state.advertData.dogData.image
          }
        ></img>
        <AdvertMap location={this.state.advertData.location} />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = store => {
  return {
    foundList: store.foundDogsList,
    lostList: store.lostDogsList
  };
};

export default connect(mapStateToProps)(Advert);
