import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { loadingRequestAC, clearMessageAC } from "../../redux/actions";

const FoundDog = props => (
  <tr>
    <td key={1}>{props.dog.dogData.breed}</td>
    <td key={2}>{props.dog.dogData.description}</td>
    <td key={3}>{props.dog.dogData.sex}</td>
    <Link to={"/editFound/" + props.dog._id}>Редактировать/Удалить</Link>
  </tr>
);
const LostDog = props => (
  <tr>
    <td key={1}>{props.dog.dogData.breed}</td>
    <td key={2}>{props.dog.dogData.description}</td>
    <td key={3}>{props.dog.dogData.sex}</td>
    <Link to={"/editLost/" + props.dog._id}>Редактировать/Удалить</Link>
  </tr>
);

class Account extends Component {
  state = {
    name: "",
    myLost: [],
    myFound: []
  };
  async componentDidMount() {
    this.props.loadingRequest();
    const response = await axios.get(
      "/api/account/" + this.props.match.params.id
    );
    this.setState({
      name: response.data.name,
      email: response.data.email,
      myFound: response.data.myFound,
      myLost: response.data.myLost
    });
    this.props.clearMessage();
  }
  foundDogList() {
    return this.state.myFound.map(e => {
      return <FoundDog dog={e} />;
    });
  }
  lostDogList() {
    return this.state.myLost.map(e => {
      return <LostDog dog={e} />;
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <h2>{this.state.email}</h2>
        <h2>Ваши объявления о пропаже</h2>
        <table>
          <tr>
            <th>Breed</th>
            <th>Description</th>
            <th>Sex</th>
          </tr>
          <tbody>{this.foundDogList()}</tbody>
        </table>
        <h2>Ваши объявления о находке</h2>
        <table>
          <tr>
            <th>Breed</th>
            <th>Description</th>
            <th>Sex</th>
          </tr>
          <tbody>{this.lostDogList()}</tbody>
        </table>
        <p>
          <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
          <Link to="/add-found-dog">Добавить объявление о находке</Link>
        </p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadingRequest: () => dispatch(loadingRequestAC()),
    clearMessage: () => dispatch(clearMessageAC())
  };
}

export default connect(null, mapDispatchToProps)(Account);
