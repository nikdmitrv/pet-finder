import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "infinite-react-carousel";

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

  renderFoundList(dog) {
    return (
      <div className="listHome" key={dog._id}>
        <div className="card">
          <img
            className="card-img-top"
            alt="..."
            src={"/api/images/" + dog.dogData.image}
          ></img>
          <h5 className="card-title">
            <b>Порода: </b>
            {dog.dogData.breed}
          </h5>
          <p className="card-text">
            <b>Описание: </b>
            {dog.dogData.description.length > 30
              ? dog.dogData.description.slice(0, 30) + "..."
              : dog.dogData.description}
          </p>
          <span>
            <b>Пол: </b>
            {dog.dogData.sex}
          </span>
          <Link to={"/advert/found/" + dog._id} className="btn btn-primary">
            Перейти к объявлению
          </Link>
        </div>
      </div>
    );
  }

  renderLostList(dog) {
    return (
      <div className="listHome" key={dog._id}>
        <div className="card">
          <img
            className="card-img-top"
            alt="..."
            src={"/api/images/" + dog.dogData.image}
          ></img>
          <h5 className="card-title">
            <b>Порода: </b>
            {dog.dogData.breed}
          </h5>
          <p className="card-text">
            <b>Описание: </b>
            {dog.dogData.description.length > 30
              ? dog.dogData.description.slice(0, 30) + "..."
              : dog.dogData.description}
          </p>
          <span>
            <b>Пол: </b>
            {dog.dogData.sex}
          </span>
          <Link to={"/advert/lost/" + dog._id} className="btn btn-primary">
            Перейти к объявлению
          </Link>
        </div>
      </div>
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
    const settings = {
      row: 2,
      dots: true,
      swipe: true,
      slidesPerRow: 3,
      // slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      duration: 20,
      shift: 800,
      centerMode: true,
      centerPadding: 30,
      initialSlide: 1
    };
    return (
      <>
        <div className="man">
          <h1 className="h1">Поиск потерянных животных</h1>
          <p className="p1">Помогите питомцу вернуться домой</p>
          <button className="b1 btn btn-primary">
            <a href="/registration">Подать объявление</a>
          </button>
        </div>
        <div className="App">
          <div className="homeMain">
            <h1>Последние потерянные </h1>

            <Slider {...settings}>
              {this.state.lostDogs.length > 0 ? (
                this.state.lostDogs.slice(0, 6).map(e => this.renderLostList(e))
              ) : (
                <div></div>
              )}
            </Slider>

            <h1>Последние найденные</h1>

            <Slider {...settings}>
              {this.state.foundDogs.length > 0 ? (
                this.state.foundDogs
                  .slice(0, 6)
                  .map(e => this.renderFoundList(e))
              ) : (
                <div></div>
              )}
            </Slider>
          </div>
        </div>
      </>
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
