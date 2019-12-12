import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFoundDogsAC } from "../../redux/actions";

export default class FoundDogsList extends Component {
  state = {
    foundDogsList: []
  };
  componentDidMount() {
    // this.props.requestFoundDogs();
    fetch("/api/found")
      .then(response => response.json())
      .then(result => this.setState({ foundDogsList: result }))
      .catch(error => error);
  }

  renderList(advert) {
    const date = new Date(advert.createdAt);
    return (
      <li key={advert._id}>
        <div>Собака найдена:</div>
        <div>{advert.dogData.breed}</div>
        <div>{advert.dogData.description}</div>
        <div>{advert.dogData.sex}</div>
        <div>Нашедший:</div>
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
    return (
      <ul>
        {this.state.foundDogsList &&
          this.state.foundDogsList.map(advert => this.renderList(advert))}
      </ul>
    );
  }
}

// function mapStateToProps(store) {
//   return {
//     foundDogsList: store.foundDogsList
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     requestFoundDogs: () => dispatch(fetchFoundDogsAC())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FoundDogsList);
