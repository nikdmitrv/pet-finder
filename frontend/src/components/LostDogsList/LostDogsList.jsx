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
        advert => new Date(advert.createdAt) >= new Date(options.byDate)
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
      <div className="card cardList" key={advert._id}>
        {/* <div>Собака потеряна:</div> */}
        <img
          alt="dog"
          src={"http://localhost:5000/api/images/" + advert.dogData.image}
        ></img>
        <div>Порода: {advert.dogData.breed}</div>
        <div>
          {advert.dogData.description.length > 30
            ? advert.dogData.description.slice(0, 30) + "..."
            : advert.dogData.description}
        </div>
        <div>Дата объявления:</div>
        <div>{date.toLocaleDateString("ru")}</div>
        <Link to={"/advert/lost/" + advert._id}>Перейти к объявлению</Link>
      </div>
    );
  }
  render() {
    return (
      <div>
        <FilterForm handleFiltration={this.handleFiltration} />
        <button className="mapList btn btn-info">
          <Link to="/lost-dogs/map">Посмотреть на карте</Link>
        </button>
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
