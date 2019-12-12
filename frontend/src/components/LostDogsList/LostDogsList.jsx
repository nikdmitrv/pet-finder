import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLostDogsAC } from "../../redux/actions";

class LostDogsList extends Component {
  componentDidMount() {
    this.props.requestLostDogs();
  }

  renderList(advert) {
    const date = new Date(advert.createdAt);
    return (
      <li key={advert._id}>
        <div>Собака потеряна:</div>
        <div>{advert.dogData.breed}</div>
        <div>{advert.dogData.description}</div>
        <div>{advert.dogData.sex}</div>
        <div>Хозяин:</div>
        <div>{advert.authorData.name}</div>
        <div>{advert.authorData.email}</div>
        <div>{advert.authorData.phoneNumber}</div>
        <div>{advert.authorData.address}</div>
        <div>Дата объявления:</div>
        <div>{date.toLocaleDateString("ru")}</div>
      </li>
    );
  }
  render() {
    console.log(this.props);
    return (
      <ul>
        {this.props.lostDogsList &&
          this.props.lostDogsList.map(advert => this.renderList(advert))}
      </ul>
    );
  }
}

function mapStateToProps(store) {
  return {
    lostDogsList: store.lostDogsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLostDogs: () => dispatch(fetchLostDogsAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogsList);
