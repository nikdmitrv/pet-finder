import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Link } from "react-router-dom";
class FoundDogsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      activeMarker: null,
      showInfo: true
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("/api/found");
      if (response.status === 200) {
        const result = await response.json();
        this.setState({ list: result });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onMapClicked = props => {
    if (this.state.showInfo) {
      this.setState({
        showInfo: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      activeMarker: marker,
      showInfo: true
    });

  renderMarkers = (dog, index) => {
    return (
      <Marker
        name={dog._id}
        title={dog.dogData.breed}
        key={dog._id}
        label={String(index + 1)}
        position={{ lat: dog.location.lat, lng: dog.location.lng }}
        onClick={this.onMarkerClick}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showInfo}
        >
          <div>
            <h2>{dog.dogData.breed}</h2>
            <span>Something</span>
          </div>
        </InfoWindow>
      </Marker>
    );
  };

  render() {
    return (
      <>
        <h1>Список найденных собак</h1>
        <div className="maps-app">
          <div
            className="map-container"
            style={{ position: "relative", height: "400px" }}
          >
            <Map
              google={this.props.google}
              zoom={10}
              initialCenter={{ lat: 55.752376, lng: 37.6722358 }}
              onClick={this.onMapClicked}
            >
              {this.state.list &&
                this.state.list.map((dog, index) =>
                  this.renderMarkers(dog, index)
                )}
            </Map>
          </div>
          <div className="maps-list-container">
            <ol className="list-group">
              {this.state.list &&
                this.state.list.map((dog, index) => (
                  <li className="list-group-item" key={dog._id}>
                    <div>
                      <div>
                        <b>{index + 1}</b>
                      </div>
                      <div>
                        <div>
                          <b>Порода: </b> {dog.dogData.breed}{" "}
                        </div>
                        <b>Пол: </b> {dog.dogData.sex}{" "}
                      </div>
                    </div>

                    <div>
                      <Link
                        className="btn-maps btn btn-info"
                        to={"/advert/found/" + dog._id}
                      >
                        Перейти к объявлению
                      </Link>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(FoundDogsMap);
