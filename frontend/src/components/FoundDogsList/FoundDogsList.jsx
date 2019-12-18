import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchFoundDogsAC } from "../../redux/actions";
import FilterForm from "../Filtration/FilterForm";

class FoundDogsList extends Component {
  state = {
    allAdverts: []
  };

  handleFiltration = options => {
    let { allAdverts } = this.state;
    if (options.byBreed) {
      allAdverts = allAdverts.filter(
        advert => advert.dogData.breed === options.byBreed
      );
    }
    if (options.bySex) {
      allAdverts = allAdverts.filter(
        advert => advert.dogData.sex === options.bySex
      );
    }
    if (options.byDate) {
      allAdverts = allAdverts.filter(
        advert => new Date(advert.createdAt) >= new Date(options.byDate)
      );
    }
    this.setState({ filtered: allAdverts });
  };
  componentDidMount() {
    this.props.requestFoundDogs();
  }
  componentDidUpdate(prevProps, prevState) {
    !this.state.allAdverts.length &&
      this.setState({ allAdverts: this.props.foundDogsList });
  }

  renderList(advert) {
    const date = new Date(advert.createdAt);
    return (
      <div key={advert._id}>
        <div>Собака найдена:</div>
        <img
          src={"http://localhost:5000/api/images/" + advert.dogData.image}
        ></img>
        <div>{advert.dogData.breed}</div>
        <div>{advert.dogData.sex}</div>
        <div>
          {advert.dogData.description.length > 30
            ? advert.dogData.description.slice(0, 30) + "..."
            : advert.dogData.description}
        </div>
        <div>Нашедший:</div>
        <div>{advert.authorData.name}</div>
        <div>{advert.authorData.email}</div>
        <div>{advert.authorData.phoneNumber}</div>
        <div>{advert.authorData.address}</div>
        <div>Дата объявления:</div>
        <div>{date.toLocaleDateString("ru")}</div>
        <Link to={"/advert/found/" + advert._id}>Перейти к объявлению</Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        <FilterForm handleFiltration={this.handleFiltration} />
        <Link to="/found-dogs/map">Посмотреть на карте</Link>
        <ul>
          {this.state.allAdverts && this.state.filtered
            ? this.state.filtered.map(advert => this.renderList(advert))
            : this.state.allAdverts.map(advert => this.renderList(advert))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    foundDogsList: store.foundDogsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestFoundDogs: () => dispatch(fetchFoundDogsAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoundDogsList);
