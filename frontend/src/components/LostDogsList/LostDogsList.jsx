import React, { Component } from "react";
import { connect } from "react-redux";
import { requestLostDogsAC } from "../../redux/actions";

class LostDogsList extends Component {
  componentDidMount() {
    this.props.requestLostDogs();
  }
  render() {
    return (
      <ul>
        {this.props.lostDogsList &&
          this.props.lostDogsList.map(dog => (
            <li>
              <div>{dog.dogData.breed}</div>
              <div>{dog.dogData.breed}</div>
              <div>{dog.createdAt}</div>
            </li>
          ))}
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
    requestLostDogs: () => dispatch(requestLostDogsAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogsList);
