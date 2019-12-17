import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchFoundDogsAC,
  fetchLostDogsAC,
  loadingRequestAC,
  clearMessageAC
} from "../../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundDogs: [],
      lostDogs: []
    };
  }

  renderList(dog) {
    return (
      <li key={dog._id}>
        <span key={1}>{dog.dogData.breed}</span>
        <span key={2}>{dog.dogData.description}</span>
        <span key={3}>{dog.dogData.sex}</span>
      </li>
    );
  }

  componentDidMount = async () => {
    try {
      const arr = {
        found: [],
        lost: []
      };
      this.props.loadingRequest();
      const responseFound = await fetch("/api/found");
      if (responseFound.status === 200) {
        const result = await responseFound.json();
        arr.found = result;
      } else {
        console.log(responseFound);
      }
      const responseLost = await fetch("/api/lost");
      if (responseLost.status === 200) {
        const result = await responseLost.json();
        arr.lost = result;
      } else {
        console.log(responseLost);
      }
      this.setState({ foundDogs: arr.found, lostDogs: arr.lost });
    } catch (error) {
      console.log(error);
    }
    this.props.clearMessage();
  };

  render() {
    return (
      <div>
        <p>Последние найденые =)</p>
        <ul>
          {this.state.foundDogs &&
            this.state.foundDogs.slice(0, 5).map(e => this.renderList(e))}
        </ul>
        <p>Последние потеряне =(</p>

        <ul>
          {this.state.lostDogs &&
            this.state.lostDogs.slice(0, 5).map(e => this.renderList(e))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    foundDogsList: store.foundDogsList,
    lostDogsList: store.lostDogsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestFoundDogs: () => dispatch(fetchFoundDogsAC()),
    requestLostDogs: () => dispatch(fetchLostDogsAC()),
    loadingRequest: () => dispatch(loadingRequestAC()),
    clearMessage: () => dispatch(clearMessageAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
