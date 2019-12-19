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
      <div className="card cardList" key={advert._id}>
        <img alt="dog" src={"/api/images/" + advert.dogData.image}></img>
        <div>
          <b>Порода</b>: {advert.dogData.breed}
        </div>
        <div>
          {" "}
          <b>Пол</b>: {advert.dogData.sex}
        </div>

        <div>
          <b>Дата объявления: </b>
          <span>{date.toLocaleDateString("ru")}</span>
        </div>
        <button className="btn btn-primary">
          <Link to={"/advert/found/" + advert._id}>Перейти к объявлению</Link>
        </button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="filter-found">
          <div>Поиск по фильтру</div>
          <FilterForm handleFiltration={this.handleFiltration} />
        </div>
        <button className="btn btn-info btn-map">
          <Link to="/found-dogs/map">Посмотреть на карте</Link>
        </button>
        <h1>Список найденных собак:</h1>
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
