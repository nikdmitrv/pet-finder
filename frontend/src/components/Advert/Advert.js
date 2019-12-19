import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    return this.state.advertData ? (
      <div className="advert card-list">
        <div className="info-advert card-body">
          <div>
            {this.props.advertType === "lost" ? (
              <h3>Потеряна собака:</h3>
            ) : (
              <h3>Найдена собака:</h3>
            )}
            <div>
              <b>Порода</b>: {this.state.advertData.dogData.breed}
            </div>
            <div className="dscp">
              <b>Описание</b>: {this.state.advertData.dogData.description}
            </div>
            <div>
              <b>Пол</b>: {this.state.advertData.dogData.sex}
            </div>
            <br></br>
            <div>
              <b>Хозяин</b>
            </div>
            <div>{this.state.advertData.authorData.name}</div>
            <div>{this.state.advertData.authorData.email}</div>
            <div>{this.state.advertData.authorData.phoneNumber}</div>
            <div>{this.state.advertData.authorData.address}</div>
            <br></br>
            <div>
              <b>Дата объявления</b>:
            </div>
            <div>
              {new Date(this.state.advertData.createdAt).toLocaleDateString(
                "ru"
              )}
            </div>
          </div>
          <div>
            <img
              alt="dog"
              src={"/api/images/" + this.state.advertData.dogData.image}
            ></img>
          </div>
        </div>
        <div>
          <Link
            to={this.props.advertType === "lost" ? "/lost-dogs" : "/found-dogs"}
            className="back btn btn-info"
          >
            Назад
          </Link>
          <AdvertMap location={this.state.advertData.location} />
        </div>
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
