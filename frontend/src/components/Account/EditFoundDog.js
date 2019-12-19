import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Map from "../Maps/Maps";
import { clearMessageAC, warningMessageAC } from "../../redux/actions";

class EditFoundDog extends Component {
  constructor(props) {
    super(props);

    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      breed: "",
      description: "",
      sex: "",
      date: "",
      image: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/found/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          breed: response.data.dogData.breed,
          description: response.data.dogData.description,
          sex: response.data.dogData.sex,
          date: response.data.dogData.date,
          image: response.data.dogData.image
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeBreed(e) {
    this.setState({
      breed: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      e.target.locationLat.value === "" ||
      e.target.locationLng.value === ""
    ) {
      this.props.warningMessage(
        "Укажите на карте место, где вы нашли животное"
      );
    } else {
      const dog = {
        breed: this.state.breed,
        description: this.state.description,
        sex: this.state.sex,
        date: this.state.date,
        location: {
          lat: e.target.locationLat.value,
          lng: e.target.locationLng.value
        }
      };
      axios
        .post(
          "http://localhost:5000/api/found/update/" +
            this.props.match.params.id,
          dog
        )
        .then(() => (window.location = "/account/" + this.props.user._id));
    }
  }

  deleteFoundDog(id) {
    axios
      .delete("http://localhost:5000/api/found/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      breed: "",
      description: "",
      sex: "",
      date: ""
    });
  }

  getLocation = location => {
    document.getElementById("location-input-lat").value = location.lat;
    document.getElementById("location-input-lng").value = location.lng;
  };

  render() {
    return (
      <div>
        <h3>Редактировать данные о собаке</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Порода: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.breed}
              onChange={this.onChangeBreed}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dog-description">Пол:</label>
            <label htmlFor="sexFilterMale">М</label>
            <input type="radio" name="dogSex" id="sexFilterMale" value="М" />
            <label htmlFor="sexFilterFemale">Ж</label>
            <input type="radio" name="dogSex" id="sexFilterFemale" value="Ж" />
          </div>

          <div className="form-group">
            <label>Описание: </label>
            <textarea
              type="text"
              required
              className="form-control"
              style={{ resize: "none", height: "100px", width: "300px" }}
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Дата: </label>
            <input
              type="date"
              required
              className="form-control"
              value={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Редактировать"
              className="btn btn-primary"
            />
          </div>

          <input
            id="location-input-lat"
            name="locationLat"
            hidden
            value=""
          ></input>
          <input
            id="location-input-lng"
            name="locationLng"
            hidden
            value=""
          ></input>

          <img
            alt="dog"
            src={"http://localhost:5000/api/images/" + this.state.image}
          ></img>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              this.deleteFoundDog(this.state._id);
            }}
          >
            Удалить
          </button>
        </form>
        <div className="error-message">{this.props.message}</div>
        <Map getLocation={this.getLocation} />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    loading: store.loading,
    message: store.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearMessage: () => dispatch(clearMessageAC()),
    warningMessage: message => dispatch(warningMessageAC(message))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFoundDog);
