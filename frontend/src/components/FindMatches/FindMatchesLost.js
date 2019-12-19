import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class FindMatchesLost extends Component {
  state = {
    guesses: []
  };

  async componentDidMount() {
    const response = await fetch("/api/matches/lost", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: this.props.match.params.id })
    });
    if (response.status === 200) {
      const result = await response.json();
      this.setState({ guesses: result });
    } else {
      console.log("error: ", response);
    }
  }

  renderGuesses(advert) {
    const date = new Date(advert.createdAt);
    return (
      <div  className="card cardList" key={advert._id}>
        
        <div>Собака найдена:</div>
        <img
          alt="dog"
          src={"http://localhost:5000/api/images/" + advert.dogData.image}
        ></img>
        <div>{advert.dogData.breed}</div>
        <div>{advert.dogData.sex}</div>
        {/* <div>
          {advert.dogData.description.length > 30
            ? advert.dogData.description.slice(0, 30) + "..."
            : advert.dogData.description}
        </div> */}
        <div>Нашедший:</div>
        <div>{advert.authorData.name}</div>
        <div>{advert.authorData.email}</div>
        <div>{advert.authorData.phoneNumber}</div>
        <div>{advert.authorData.address}</div>
        <div>Дата объявления:</div>
        <div>{date.toLocaleDateString("ru")}</div>
        <Link className="btn btn-primary" to={"/advert/found/" + advert._id}>
          Перейти к объявлению
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="matches-lost">
        <h1>Найденные совпадения:</h1>
        <ul>
          {this.state.guesses.length > 0 ? (
            this.state.guesses.map(advert => this.renderGuesses(advert))
          ) : (
            <h2>Извините, совпадений нет.</h2>
          )}
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(FindMatchesLost);
