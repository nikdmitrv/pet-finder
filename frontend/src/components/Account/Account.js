import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { loadingRequestAC, clearMessageAC } from "../../redux/actions";

const FoundDog = props => (
  <div className="card cardList" key={props._id}>
    <div className="card-title">{props.dog.dogData.breed}</div>
    <div className="card-title">{props.dog.dogData.sex}</div>
    <div className="card-text">
      {props.dog.dogData.description.length > 30
        ? props.dog.dogData.description.slice(0, 30) + "..."
        : props.dog.dogData.description}
    </div>
    <div>
      {
        <img
          alt="dog"
          className="card-img"
          src={"/api/images/" + props.dog.dogData.image}
        />
      }
    </div>
    <div>
      <button className="btn btn-primary float">
        <Link to={"/editFound/" + props.dog._id}>Редактировать/Удалить</Link>
      </button>
    </div>
    {/* <br></br> */}
    <div>
      <button className="btn btn-primary">
        <Link to={"/find-matches/found/" + props.dog._id}>
          Посмотреть совпадения
        </Link>
      </button>
    </div>
  </div>
);

const LostDog = props => (
  <div className="card cardList" key={props._id}>
    <div className="card-title">{props.dog.dogData.breed}</div>
    <div className="card-title">{props.dog.dogData.sex}</div>
    <div className="card-text">
      {props.dog.dogData.description.length > 30
        ? props.dog.dogData.description.slice(0, 30) + "..."
        : props.dog.dogData.description}
    </div>
    <div>
      {
        <img
          alt="dog"
          className="card-img"
          src={"/api/images/" + props.dog.dogData.image}
        />
      }
    </div>
    <div>
      <button className="btn btn-primary float">
        <Link to={"/editLost/" + props.dog._id}>Редактировать/Удалить</Link>
      </button>
    </div>
    {/* <br></br> */}
    <div>
      <button className="btn btn-primary">
        <Link to={"/find-matches/lost/" + props.dog._id}>
          Посмотреть совпадения
        </Link>
      </button>
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
      <>
        {this.state.email ? (
          <div className="account-main">
            <h2 id="accH2">Добро пожаловать, {this.state.name}!</h2>
            {/* <h2>Ваш email: {this.state.email}</h2> */}
            <div>
              <button className="btn btn-info btnAcc">
                <Link to="/add-lost-dog">Добавить объявление о пропаже</Link>
              </button>
              <button className="btn btn-info btnAcc">
                <Link to="/add-found-dog">Добавить объявление о находке</Link>
              </button>
            </div>
            <h3>Ваши объявления о находке:</h3>
            {this.state.myFound.length > 0 ? (
              <div className="sds">{this.foundDogList()}</div>
            ) : (
              <div>У вас нет объявлений о находке</div>
            )}

            <h3>Ваши объявления о пропаже:</h3>
            {this.state.myLost.length > 0 ? (
              <div className="sds">{this.lostDogList()}</div>
            ) : (
              <div>У вас нет объявлений о пропаже</div>
            )}
          </div>
        ) : null}
      </>
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
