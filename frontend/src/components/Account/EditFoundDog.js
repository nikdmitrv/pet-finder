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
      .get("/api/found/" + this.props.match.params.id)
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
          "/api/found/update/" +
            this.props.match.params.id,
          dog
        )
        .then(() => (window.location = "/account/" + this.props.user._id));
    }
  }

  deleteFoundDog(id) {
    axios
      .delete("/api/found/" + this.props.match.params.id)
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
      <>
        
      <div>
      <h3>Редактировать данные о собаке</h3>
        <form  className="form-group"onSubmit={this.onSubmit}>
          <div>
            <label>Порода: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.breed}
              onChange={this.onChangeBreed}
            />
          </div>

          <div>
            <label htmlFor="dog-description">Пол:</label>
            <label htmlFor="sexFilterMale">М</label>
            <input type="radio" name="dogSex" id="sexFilterMale" value="М" />
            <label htmlFor="sexFilterFemale">Ж</label>
            <input type="radio" name="dogSex" id="sexFilterFemale" value="Ж" />
          </div>

          <div>
            <label>Описание: </label>
            <textarea
              type="text"
              required
              className="form-control"
              style={{ resize: "none", height: "100px", width: "400px" }}
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

          <div className="form-group">
            <button className="btn btn-primary btn-edit">Подтвредить изменения</button>           
          </div>
          
          <div className="form-group">
          <button
            className="btn btn-primary btn-edit"
            type="button"
            onClick={() => {
              this.deleteFoundDog(this.state._id);
            }}
          >
             Удалить объявление
          </button>
          </div>
        </form>
        <div className="error-message">{this.props.message}</div>
         <div className="mapwrap"> 
        <Map className="mapwrap" getLocation={this.getLocation} />
        </div>  
      </div>
      </>
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
