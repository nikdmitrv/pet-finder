import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { loadingRequestAC, clearMessageAC } from "../../redux/actions";

const FoundDog = props => (
  <tr>
    <td>{props.dog.dogData.breed}</td>
    <td>{props.dog.dogData.sex}</td>
    <td>
      <span>
        {props.dog.dogData.description.length > 30
          ? props.dog.dogData.description.slice(0, 30) + "..."
          : props.dog.dogData.description}
      </span>
    </td>
    <td>
      {
        <img
          alt="dog image"
          src={"http://localhost:5000/api/images/" + props.dog.dogData.image}
        />
      }
      >
    </td>
    <Link to={"/editFound/" + props.dog._id}>Редактировать/Удалить</Link>
    <div>
      <Link to={"/find-matches/found/" + props.dog._id}>
        Посмотреть совпадения
      </Link>
    </div>
  </tr>
);
const LostDog = props => (
  <div className="card">
    <div>{props.dog.dogData.breed}</div>
    <div>{props.dog.dogData.sex}</div>
    <div>{props.dog.dogData.description.length > 30
          ? props.dog.dogData.description.slice(0, 30) + "..."
          : props.dog.dogData.description}</div>
    <div>
      {
        <img
        class="card-img-top" 
          alt="dog image"
          src={"http://localhost:5000/api/images/" + props.dog.dogData.image}
        />
      }
      >
    </div>
    <Link to={"/editLost/" + props.dog._id}>Редактировать/Удалить</Link>
    <div>
      <Link to={"/find-matches/lost/" + props.dog._id}>
        Посмотреть совпадения
      </Link>
    </div>
  </div>
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
        <h2>Ваши объявления о находке</h2>
        <div className="card">
          <div>{this.foundDogList()}</div>
          <div>Breed:</div>
          <div>Description:</div>
          <div>Sex:</div>
        </div>
        <h2>Ваши объявления о пропаже</h2>
        <table>
          <tr>
            <th>Порода</th>
            <th>Пол</th>
            <th>Описание</th>
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
