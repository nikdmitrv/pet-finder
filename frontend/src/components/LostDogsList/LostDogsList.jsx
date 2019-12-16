import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchLostDogsAC } from "../../redux/actions";
import FilterForm from "../Filtration/FilterForm";

class LostDogsList extends Component {
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
        advert => advert.createdAt === options.byDate
      );
    }
    this.setState({ filtered: allAdverts });
  };
  componentDidMount() {
    this.props.requestLostDogs();
  }
  componentDidUpdate(prevProps, prevState) {
    !this.state.allAdverts.length &&
      this.setState({ allAdverts: this.props.lostDogsList });
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
        <Link to={"/advert/lost/" + advert._id}>Перейти к объявлению</Link>
        <div>Дата потери:</div>
        <div>{advert.dogData.date}</div>
      </li>
    );
  }
  render() {
    return (
      <div>
        <FilterForm handleFiltration={this.handleFiltration} />
        <Link to="/lost-dogs/map">Посмотреть на карте</Link>
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
    lostDogsList: store.lostDogsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLostDogs: () => dispatch(fetchLostDogsAC())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LostDogsList);
